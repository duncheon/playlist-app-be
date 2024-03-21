const passport = require('passport');
const localStrategy = require('./local');
passport.use(localStrategy);

module.exports = passport;
