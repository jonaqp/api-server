const express = require('express');

const server = express();

require('./middleware/bodyParser')(server);

require('./middleware/cors')(server);

module.exports = server;