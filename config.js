module.exports = {
  HOST: process.env.HOST || 'http://localhost',
  NAME: 'API-Server',
  PORT: process.env.PORT || 5555,
  DBURI: process.env.DBURI || 'mongodb://localhost/api-server-devtest',
  JWT: process.env.JWT || 'a super secret JWT secret'
}