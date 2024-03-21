const { User } = require('../models/index');
const bcrypt = require('bcrypt');

const exampleUser = (req, res, next) => {
  return res.status(200).json({ user: 'example1' });
};

const signUp = async (req, res, next) => {
  const body = req.body;
  const { username, password, fullname } = body;

  if (username && password && fullname) {
    try {
      const userExist = await User.findOne({ where: { username: username } });
      if (userExist) {
        // suggest 409
        return res.status(400).send({ description: 'User exists' });
      } else {
        const passwordHash = await bcrypt.hash(password, 10);
        const savedUser = await User.create({
          username,
          passwordHash,
          fullname,
        });

        return res.status(201).end();
      }
    } catch (err) {
      return res.status(400).end();
    }
  } else res.status(404).json({ description: 'Missing fields' });
};

const authenticateUser = async (req, res, next) => {
  const user = req.user;
  if (user) {
    try {
      const username = user.username;
      const userData = await User.findOne({ where: { username } });
      if (userData) {
        return res.status(200).json({
          id: userData.id,
          fullname: userData.fullname,
          username: userData.username,
        });
      } else return res.status(401).end();
    } catch (err) {
      return res.status(401).end();
    }
  }
  return res.status(401).end();
};

const signOut = async (req, res, next) => {
  return res.clearCookie('access-token').end();
};

module.exports = {
  exampleUser,
  signUp,
  signOut,
  authenticateUser,
};
