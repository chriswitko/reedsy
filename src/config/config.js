const dbSettings = {
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    'localhost:27017/reedsy'
  ]
}

const serverSettings = {
  static: false,
  port: process.env.PORT || 3021
}

const oAuthSettings = {
  facebookClientId: '1422866204454575',
  facebookSecretId: '8e3a0088b1d3268256b3291b060b885e',
  twitterClientId: 'M2vGQUDElJ5al60RusviJwcnB',
  twitterSecretId: 'DN2VlpuvigY2N8P8gEYRzczk8ipYpB30pR3sqFbxdNPI197FYy'
}

module.exports = Object.assign({}, { dbSettings, serverSettings, oAuthSettings })
