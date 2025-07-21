const express = require('express');
const app = express();
const offerRoutes = require('./routes/offer');

app.use(express.json());
app.use('/', offerRoutes);

module.exports = app;