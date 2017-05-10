'use strict'
const {EventEmitter} = require('events')
const server = require('./server/server')
const repository = require('./repository')
const config = require('./config/')
const mediator = new EventEmitter()

console.log('--- Techspeller Service ---')
console.log('Connecting to techspeller repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

const startServerWithDatabase = _ => {
  mediator.on('db.ready', (db) => {
    initRepository(db)
  })

  mediator.on('db.error', (err) => {
    console.error(err)
  })

  config.db.connect(config.dbSettings, mediator)
}

const initRepository = db => {
  repository.connect(db)
    .then(repo => {
      console.log('Connected. Starting Server')

      return server.start({
        port: config.serverSettings.port,
        ssl: config.serverSettings.ssl,
        oAuthSettings: config.oAuthSettings,
        dbSettings: config.dbSettings,
        repo
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
    })
}

startServerWithDatabase()

mediator.emit('boot.ready')
