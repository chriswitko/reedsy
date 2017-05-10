const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('../api')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const compression = require('compression')

const socket = require('./socket.js')
const agenda = require('./agenda.js')

ejs.delimiter = '?'
const cacheTime = 86400000 * 7 // 7 days

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', 'mongodb://')

  return `${url.substr(0, url.length - 1)}`
}

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())

    app.use(cors())
    app.options('*', cors())

    app.use(compression())

    app.use(require('cookie-parser')('tech$1125speller', {
      maxAge: 31 * 24 * 60 * 60 * 1000
    }))

    app.use(bodyParser.json())       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
      extended: true
    }))
    app.use(session({
      secret: 'tech$1125speller',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({url: getMongoURL(options.dbSettings)})
    }))

    app.use(express.static(path.join(__dirname, '/../client/build'), { maxAge: cacheTime }))
    app.set('views', path.join(__dirname, '/../client'))
    app.engine('.html', require('express-ejs-extend'))
    app.set('view engine', 'html')

    app.use((err, req, res, next) => {
      console.log('err', err)
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    const server = app.listen(options.port, () => resolve(server))
    socket.start(server, options).then(io => {
      agenda.start(options.repo, io).then(queueClient => {
        api(app, io, queueClient, options)

        app.on('close', () => {
          options.repo.disconnect()
        })

        const graceful = _ => {
          queueClient.stop(_ => {
            process.exit(0)
          })
        }

        process.on('SIGINT', graceful)
        process.on('SIGTERM', graceful)
      })
    })
  })
}

module.exports = Object.assign({}, {start})
