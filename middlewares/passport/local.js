const localStrategy = require('passport-local').Strategy;
const { User } = require('../../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { USER_TOKEN_SECRET } = require('../../config/envConf');
const { getUserToken } = require('../../utils/token/token');

const configuredLocalStrategy = new localStrategy(async function (
  username,
  password,
  done
) {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return done(null, false);
    }
    // if (!user.verifyPassword(password)) {
    //   return done(null, false);
    // }
    else {
      const verifyPassword = bcrypt.compareSync(password, user.passwordHash);
      if (!verifyPassword) {
        return done(null, false);
      }
    }

    const userToken = getUserToken({ username: user.username, id: user.id });

    const responseData = {
      id: user.id,
      token: userToken,
      fullname: user.fullname,
      username: user.username,
    };

    return done(null, responseData);
  } catch (err) {
    return done(err);
  }
});

module.exports = configuredLocalStrategy;
