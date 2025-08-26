const express = require('express');
const app = express();
const { env } = require('./configs/eviroment');
const apiRoutes = require('./routes');

// Import file connect DB
const connection = require('./configs/connectDB'); 

// Middleware to parse JSON requests
app.use(express.json());

// Router
app.use('/api', apiRoutes);

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});