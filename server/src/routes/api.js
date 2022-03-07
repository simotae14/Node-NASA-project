// Express code
const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

const api = express.Router();

// add planetsRouter as a middleware
api.use('/planets', planetsRouter);
// add launchesRouter as a middleware
api.use('/launches', launchesRouter);

module.exports = api;
