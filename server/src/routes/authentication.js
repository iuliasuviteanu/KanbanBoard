
const errUtils = require('../helpers/errors');

module.exports = [
  {
    endpoint: 'AUTHENTICATION.LOGIN',
    callback: (req, res) => {
      res.setHeader('pnx-session', JSON.stringify({
        'sessionId': 'sessionId',
        'sessionExpiryDate': new Date(Date.now() + (60 * 60 * 1000)).toISOString()
      }));
      res.statusCode = 200;
      res.send(true);
    },
    onError: (req, res) => {
      errUtils.simulateError(req, res, 'INTERNAL_SERVER_ERROR');
    }
  },
  {
    endpoint: 'AUTHENTICATION.LOGOUT',
    callback: (req, res) => {
      res.send(true);
    },
    onError: (req, res) => {
      errUtils.simulateError(req, res, 'INTERNAL_SERVER_ERROR');
    }
  }
];
