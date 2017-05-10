'use strict'
const config = require('../config/')

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', 'mongodb://')

  return `${url.substr(0, url.length - 1)}`
}


const start = (repo, io) => {
  return new Promise((resolve, reject) => {
    const Instance = require('agenda')
    const agenda = new Instance({db: {address: getMongoURL(config.dbSettings), collection: 'nsqueue'}})

    const tasks = ['pdf', 'html']

    tasks.forEach(function (type) {
      require('./tasks/' + type)(repo, agenda, io)
    })

    agenda.on('ready', function () {
      console.log('Connected Queue Server (Agenda)')

      agenda.start()
      resolve(agenda)
    })
  })
}

// module.exports = agenda

module.exports = Object.assign({}, {start})
