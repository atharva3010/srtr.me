const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// var forceSsl = require('force-ssl-heroku');

const app = express();

// Use dotenv variables
dotenv.config();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({extended: false}));
// app.use(forceSsl);

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

// Handle production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public'));

  // Handle manifest.json & service-worker.js
  app.get('/manifest.json', (req, res) => res.sendFile(__dirname + '/public/manifest.json'));
  app.get('/service-worker.js', (req, res) => res.sendFile(__dirname + '/public/service-worker.js'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));