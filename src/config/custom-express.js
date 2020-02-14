const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ type: 'application/json' }));

const rotas  = require('../app/rotas/rotas');
rotas(app);

module.exports = app;