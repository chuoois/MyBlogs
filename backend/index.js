const express = require('express');
const app = express();
const { env } = require('./configs/eviroment');
const apiRoutes = require('./routes');

// Import file connect DB
const connection = require('./configs/connectDB'); 

// Middleware CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://myblogspalala.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware to parse JSON requests
app.use(express.json());

// Router
app.use('/api', apiRoutes);

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});