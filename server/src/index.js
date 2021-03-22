const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');
const _ = require('lodash');

const {HOST, PORT, API_PREFIX} = require('./config');
const routes = require('./routes.js');
const errorUtils = require('./helpers/errors');
const {ENDPOINTS} = require('./helpers/endpoints');

// creates express app
const app = express();

// increases security of the API
app.use(helmet());

// parses JSON to JS objects
app.use(bodyParser.json());

// enables CORS for all req
app.use(cors());

// for seeing HTTP req in logs
app.use(morgan('combined'));

// route handling
routes.forEach((route) => {
  let method, path;
  const endpoint = _.get(ENDPOINTS, route.endpoint, null);

  if (endpoint) {
    method = endpoint.method;
    path = endpoint.fullPath;
  } else {
    method = route.method;
    path = `${API_PREFIX}/${route.path}`;
  }

  if (!method) {
    console.log('Endpoint missing ', route);
  }

  app[method.toLowerCase()](
    path,
    (...args) => {
      setTimeout(() => {
        if (errorUtils.hasError(route)) {
          route.onError(...args);
        } else {
          route.callback(...args);
        }
      }, route.delay || 1500);
    });
});

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, HOST, () => {
    console.log(`Running on https://${HOST}:${PORT}${API_PREFIX}`);
  });
} else {
  https.createServer({
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
  }, app).listen(PORT, HOST, () => {
    console.log(`Running on https://${HOST}:${PORT}`);
  });
}
