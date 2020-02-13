const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const app = express();

var options = {
    swaggerOptions: {
      authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
  };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use(bodyParser.json({ type: 'application/json' }));

const rotas  = require('../app/rotas/rotas');
rotas(app);

module.exports = app;