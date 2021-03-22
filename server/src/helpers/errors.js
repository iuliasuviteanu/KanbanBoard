const errorFlags = require('../errors.flags');
const ERRORS = require('../errors.constants');

const hasError = (route) => {
  const flag = route.endpoint ? route.endpoint: route.path;

  if (errorFlags[flag] === undefined) {
    console.log('endpoint error not supported for ', flag);
    return false;
  }

  return errorFlags[flag];
}

const simulateServerError = (req, res) => {
  res.status(500).send({
    code: ERRORS.INTERNAL_SERVER_ERROR
  });
}

const simulateError = (req, res, code, status = 500) => {
  if (!ERRORS[code]) {
    console.log('error code ' + code + 'is not supported');
  }

  res.status(status).send({
    code: ERRORS[code] || code
  });
}

module.exports = {
  // check it endpoint should simulate error
  hasError,

  // error simulators
  simulateError,
  simulateServerError
}
