const {mapValues} = require('lodash');

const { API_PREFIX } = require('../config');
const MICROSERVICES = require('../config/endpoints.config');

const joinPath = (...args) => {
  return args
  .map((part, i) => {
    if (i === 0) {
      return part.trim().replace(/[\/]*$/g, '');
    } else {
      return part.trim().replace(/(^[\/]*|[\/]*$)/g, '');
    }
  })
  .filter(x => x.length)
  .join('/');
};

const buildPath = endpoint => {
  const { microservice, path } = endpoint;
  const { contextPath, version, serviceName } = MICROSERVICES[microservice];

  return joinPath(
    API_PREFIX,
    contextPath,
    version,
    serviceName,
    path
  );
};

const ENDPOINTS = mapValues(MICROSERVICES, ({ endpoints }, microservice) => ({
  ...mapValues(endpoints, ({ method, path }) => ({
    method,
    path,
    fullPath: buildPath({
      microservice,
      path
    })
  }))
}));

module.exports = {
  ENDPOINTS
};
