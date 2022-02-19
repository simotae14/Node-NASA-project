// Express code
const express = require('express');

const planetsRouter = require('./routes/planets/planets.router');

const app = express();
app.use(express.json()); // middleware to handle json directly
// add planetsRouter as a middleware
app.use(planetsRouter);


module.exports = app;
