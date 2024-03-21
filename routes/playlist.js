const {
  createPlaylist,
  getPlaylistById,
  getPlayLists,
  addVideo,
} = require('../controllers/playlist');
const { createVideo } = require('../controllers/video');
const { extractUser } = require('../middlewares/auth/auth');

const PlayListRouter = require('express').Router();
const baseUrl = '/api/playlist';

const dummyUser = (req, res, next) => {
  req.user = { id: 1, username: 'root' };
  console.log('HI');
  next();
};

PlayListRouter.post(`${baseUrl}/create`, extractUser, createPlaylist);
PlayListRouter.get(`${baseUrl}`, dummyUser, getPlaylistById);
PlayListRouter.get(`${baseUrl}/list`, dummyUser, getPlayLists);
PlayListRouter.post(
  `${baseUrl}/:playlistId/songs`,
  dummyUser,
  createVideo,
  addVideo
);

module.exports = PlayListRouter;
