const path = require('path');
// Express code
const express = require('express');
// Cors
const cors = require('cors');
// morgan
const morgan = require('morgan');

// import Router
const api = require('./routes/api');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
// add morgan
app.use(morgan('combined'));

app.use(express.json()); // middleware to handle json directly
app.use(express.static(path.join(__dirname, '..','public')));

app.use('/v1', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
