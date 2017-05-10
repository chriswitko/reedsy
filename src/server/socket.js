const start = (server, options) => {
  return new Promise((resolve, reject) => {
    const io = require('socket.io')(server)
    console.log('Connecting to Socket.io server')

    io.on('connection', client => {
      console.log('Socket.io client connected...')

      client.on('join', data => {
        options.repo.conversions.getAllConversions().then(conversions => {
          client.emit('conversions', conversions)
        })
      })

      client.on('conversions', data => {
        client.emit('conversions', data)
        client.broadcast.emit('conversions', data)
      })
      resolve(client)
    })
  })
}

module.exports = Object.assign({}, {start})
