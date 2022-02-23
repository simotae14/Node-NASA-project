const express = require('express');

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require('./launches.controller');

const launchesRouter = express.Router();

// GET launches
launchesRouter.get('/', httpGetAllLaunches);
// POST launches
launchesRouter.post('/', httpAddNewLaunch);
// DELETE launches/:id
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;
