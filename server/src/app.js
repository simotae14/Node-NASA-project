// Express code
const express = require('express');
// Cors
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json()); // middleware to handle json directly
// add planetsRouter as a middleware
app.use(planetsRouter);

module.exports = app;
