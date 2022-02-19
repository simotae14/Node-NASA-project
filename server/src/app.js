// Express code
const express = require('express');

const app = express();
app.use(express.json()); // middleware to handle json directly

module.exports = app;
