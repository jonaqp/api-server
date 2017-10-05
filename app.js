// Mongo Component
require('./mongo');

// Server Component
const server = require('./server');
const { HOST, PORT, NAME } = require('./config');

// Auth Component
const authRoutes = require('./auth/routes');
const { authorizeRoute } = require('./auth/services')
server.use('/auth', authRoutes);

// Handle unspecified routes
server.use((req, res) => res.status(404).json({
  error: `Unable to resolve ${req.originalUrl}`
}));

// Start App
server.listen(PORT, () => {
  // TODO: Add logger
  console.log(`${NAME} running at ${HOST}:${PORT} `)
});
