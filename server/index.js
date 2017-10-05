const express = require('express');

const server = express();

require('./bodyParser')(server);

require('./cors')(server);

// Handle unspecified routes
server.use((req, res) => res.status(404).json({
  error: `Unable to resolve ${req.originalUrl}`
}));

module.exports = server;