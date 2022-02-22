const path = require('path');
// Express code
const express = require('express');
// Cors
const cors = require('cors');
// morgan
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
// add morgan
app.use(morgan('combined'));

app.use(express.json()); // middleware to handle json directly
app.use(express.static(path.join(__dirname, '..','public')));

// add planetsRouter as a middleware
app.use('/planets', planetsRouter);
// add launchesRouter as a middleware
app.use('/launches', launchesRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
