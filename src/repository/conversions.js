'use strict'
const ObjectID = require('./ObjectID')
const AppError = require('./AppError')

const repository = (db) => {
  const collectionConversions = db.collection('conversions')

  const updateStatus = (id, status) => {
    return new Promise((resolve, reject) => {
      const sendConversion = (err, conversion) => {
        if (err || !conversion) {
          reject(AppError(`An error occured fetching a conversion, err: ${err}`))
        }
        resolve(conversion)
      }
      if (!id) {
        sendConversion('No conversion')
      } else {
        collectionConversions.update({_id: ObjectID(id.toString())}, {$set: {status: status}}, sendConversion)
      }
    })
  }

  const getAllConversions = () => {
    return new Promise((resolve, reject) => {
      const conversions = []

      const cursor = collectionConversions.find({}, {}, {sort: [['createdAt', -1]]})
      const addConversion = (conversion) => {
        conversions.push(conversion)
      }
      const sendConversions = (err) => {
        if (err) {
          resolve([])
        }
        resolve(conversions.slice())
      }
      cursor.forEach(addConversion, sendConversions)
    })
  }

  const addConversion = conversion => {
    return new Promise((resolve, reject) => {
      const sendConversion = (err, conversion) => {
        if (err) {
          reject(AppError(`An error occured fetching a conversion, err: ${err}`))
        } else {
          resolve(conversion)
        }
      }
      const createConversion = (err, conversion) => {
        collectionConversions.insertOne(conversion, _ => {
          sendConversion(err, conversion)
        })
      }
      if (!conversion) {
        sendConversion('No conversion')
      } else {
        createConversion(null, conversion)
      }
    })
  }

  return Object.assign({}, {
    getAllConversions,
    addConversion,
    updateStatus
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
