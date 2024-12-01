const cors = require('cors');

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions); 