const express = require('express');

const {
  getAllLaunches,
} = require('./launches.controller');

const launchesRouter = express.Router();

// GET planets
launchesRouter.get('/launches', getAllLaunches);

module.exports = launchesRouter;
