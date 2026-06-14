require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

const app = express();

// Cache DB connection across serverless invocations
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  isConnected = true;
  console.log('MongoDB connected');
}

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: false,
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check responds immediately — no DB needed
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// All other routes go through DB connection
app.use((req, res, next) => {
  connectDB()
    .then(next)
    .catch(() => res.status(503).json({ message: 'Database unavailable' }));
});

app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
