module.exports = (repo, agenda, io) => {
  agenda.define('process_pdf', {concurrency: 3}, function (job, done) {
    repo.conversions.updateStatus(job.attrs.data.id, 'Processing').then(_ => {
      io.emit('update_status', {
        id: job.attrs.data.id,
        status: 'Processing'
      })
      io.broadcast.emit('update_status', {
        id: job.attrs.data.id,
        status: 'Processing'
      })

      setTimeout(_ => {
        repo.conversions.updateStatus(job.attrs.data.id, 'Processed').then(_ => {
          io.emit('update_status', {
            id: job.attrs.data.id,
            status: 'Processed'
          })
          io.broadcast.emit('update_status', {
            id: job.attrs.data.id,
            status: 'Processed'
          })
          done()
        })
      }, 100000)
    })
  })
}
