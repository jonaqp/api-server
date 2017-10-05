// Mongo Component
require('./mongo');

// Server Component
const Server = require('./server').Server;
const { HOST, PORT, NAME } = require('./config');

// Auth Component
const authRoutes = require('./auth/routes');
const { authorizeRoute } = require('./auth/services')
Server.use('/auth', authRoutes);

// User Component
const userRoutes = require('./user/routes');
Server.use('/user', authorizeRoute, userRoutes);

// Handle unspecified routes
Server.use((req, res) => res.status(404).json({
  error: `Unable to resolve ${req.originalUrl}`
}));

// Start App
Server.listen(PORT, () => {
  // TODO: Add logger
  console.log(`${NAME} running at ${HOST}:${PORT} `)
});
