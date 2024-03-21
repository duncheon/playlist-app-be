const jwt = require('jsonwebtoken');
const { USER_TOKEN_SECRET } = require('../../config/envConf');

module.exports = {
  extractUser: async (req, res, next) => {
    const authorization = req.get('authorization');
    let token = null;
    if (authorization && authorization.startsWith('Bearer ')) {
      token = authorization.replace('Bearer ', '');
    }
    console.log(token);

    if (!token) {
      return res.status(401).end();
    }

    try {
      const user = jwt.verify(token, USER_TOKEN_SECRET);
      console.log(user);
      if (user) {
        req.user = user;
        next();
      } else res.status(401).end();
    } catch (err) {
      console.log(err);
      return res.status(401).end();
    }
  },
};
