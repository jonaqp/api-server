const mongoose = require('mongoose');

// build the model
const globalModel = require('./buildModel');

// configure database connection
const { DBNAME, DBURI } = require('../config')
mongoose.Promise = global.Promise;
const options = {
  useMongoClient: true,
  promiseLibrary: global.Promise
}

// connect to database
mongoose.connect(DBURI, options, (error) => {
  // TODO: add logger
  if (error) return console.error('Error connecting to mongo ==>', error)
  // TODO: add logger
  console.log(`Mongo DB ${DBNAME} connected`);
})

// export the global model object
module.exports = globalModel;