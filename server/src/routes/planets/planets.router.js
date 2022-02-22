const express = require('express');

const {
  httpGetAllPlanets,
} = require('./planets.controller');

const planetsRouter = express.Router();

// GET planets
planetsRouter.get('/planets', httpGetAllPlanets);

module.exports = planetsRouter;
