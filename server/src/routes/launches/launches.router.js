const express = require('express');

const {
  httpGetAllLaunches,
} = require('./launches.controller');

const launchesRouter = express.Router();

// GET planets
launchesRouter.get('/launches', httpGetAllLaunches);

module.exports = launchesRouter;
