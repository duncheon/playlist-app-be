const { User, Playlist, playlists_videos } = require('../models/index');

const getPlaylistById = async (req, res, next) => {
  const id = req.query.id;
  try {
    const playlist = await Playlist.findByPk(id);
    if (!playlist) {
      return res.status(404).end();
    } else return res.status(200).json(playlist);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

const getPlayLists = async (req, res, next) => {
  const { start = 0, total = 5 } = req.query;
  const userId = req.user.id;
  try {
    const userPlaylists = await Playlist.findAll({
      where: { userId },
      offset: start,
      limit: total,
      order: [['createAt', 'ASC']],
    });

    return res.status(200).send(userPlaylists);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

const createPlaylist = async (req, res, next) => {
  const { name } = req.body;
  console.log(req.user);
  const userId = req.user.id;

  if (!name) {
    res.status(404).json({ description: 'Missing fields' });
  }

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).end();
    }
    const newPlaylist = await Playlist.create({ name, userId });

    return res.status(201).json(newPlaylist);
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
};

const addVideo = async (req, res, next) => {
  const { playlistId } = req.params;
  const { id } = req.body;
  const addedVideo = req.addedVideo;
  try {
    const findPlaylist = await Playlist.findByPk(playlistId);

    if (!findPlaylist) {
      return res.status(404).end();
    }
    if (findPlaylist.userId !== req.user.id) {
      return res.status(401).end();
    }
    const addToPlaylist = await playlists_videos.create({
      playlistId,
      videoId: id,
    });

    return res.status(201).json({
      message: 'Added new video to playlist',
      playlistId,
      video: addedVideo,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

module.exports = { createPlaylist, getPlaylistById, getPlayLists, addVideo };
