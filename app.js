const server = require('./server');
const { HOST, PORT, NAME } = require('./config');

server.listen(PORT, () => {
  // TODO: Add logger
  console.log(`${NAME} running at ${HOST}:${PORT} `)
});
