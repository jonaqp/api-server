const express = require('express');

const server = express();

require('./bodyParser')(server);

require('./cors')(server);

module.exports = server;