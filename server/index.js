const express = require('express');

const Server = express();

const Router = express.Router

require('./middleware/bodyParser')(Server);

require('./middleware/cors')(Server);

module.exports = {
  Server,
  Router
};