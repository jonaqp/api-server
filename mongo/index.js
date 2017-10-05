const mongoose = require('mongoose');

const { DBNAME, DBURI } = require('../config')

mongoose.Promise = global.Promise;

const options = {
  useMongoClient: true,
  promiseLibrary: global.Promise
}

const db = require('./buildSchema');

mongoose.connect(DBURI, options, (error) => {
  // TODO: add logger
  if (error) return console.error('Error connecting to mongo ==>', error)
  // TODO: add logger
  console.log(`Mongo DB ${DBNAME} connected`);
})

module.exports = {
  db
}