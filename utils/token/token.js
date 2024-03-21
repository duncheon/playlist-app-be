const jwt = require('jsonwebtoken');
const { USER_TOKEN_SECRET } = require('../../config/envConf');

const getUserToken = (data) => {
  return jwt.sign(data, USER_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

module.exports = {
  getUserToken,
};
