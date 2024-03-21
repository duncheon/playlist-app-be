const { getSongsByPlaylistId } = require('../controllers/video');

const videoRouter = require('express').Router();

const baseURL = '/api/song';
const dummyUser = (req, res, next) => {
  req.user = { id: 1, username: 'root' };
  console.log('HI');
  next();
};
videoRouter.get(baseURL, dummyUser, getSongsByPlaylistId);

module.exports = videoRouter;
