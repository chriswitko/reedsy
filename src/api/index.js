'use strict'

module.exports = (app, io, agenda, options) => {
  app.post('/api/process/:type', (req, res) => {
    const id = new Date().getTime()
    const type = req.params.type.toString()
    const conversion = {
      type: type,
      name: `${type.toUpperCase()} #${id}`,
      createdAt: new Date().toISOString(),
      status: 'In Queue'
    }

    options.repo.conversions.addConversion(Object.assign({}, conversion)).then(conversion => {
      io.emit('add_conversion', conversion)
      io.broadcast.emit('add_conversion', conversion)

      agenda.now(`process_${type}`, {id: conversion._id})

      res.status(200).json({
        status: 'ok',
        type: type
      })
    })
  })

  app.get('/', (req, res, next) => {
    res.render('build/index.html')
  })
}
