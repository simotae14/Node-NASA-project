const express = require('express');

const {
  getAllPlanets,
} = require('./planets.controller');

const planetsRouter = express.Router();

// GET planets
planetsRouter.get('/planets', getAllPlanets);

module.exports = planetsRouter;
