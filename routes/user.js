const passport = require('../middlewares/passport/index');
const {
  exampleUser,
  signUp,
  signOut,
  authenticateUser,
} = require('../controllers/user');
const { extractUser } = require('../middlewares/auth/auth');

const userRouter = require('express').Router();
const baseURL = '/api/user';

userRouter.get(`${baseURL}/example`, exampleUser);
userRouter.post(`${baseURL}/signup`, signUp);
userRouter.post(
  `${baseURL}/signin`,
  passport.authenticate('local', { session: false }),
  function (req, res) {
    return res.status(200).json(req.user);
  }
);

userRouter.get(`${baseURL}/authenticate`, extractUser, authenticateUser);

userRouter.delete(`${baseURL}/signout`, signOut);
module.exports = userRouter;
