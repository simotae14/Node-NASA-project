const express = require('express');

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

// GET planets
launchesRouter.get('/', httpGetAllLaunches);
// POST planets
launchesRouter.post('/', httpAddNewLaunch);

module.exports = launchesRouter;
