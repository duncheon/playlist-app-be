const { YTB_API_KEY, YTB_API_URL } = require('../config/envConf');
const ytbVideosAPI = `${YTB_API_URL}/videos?key=${YTB_API_KEY}`;
const imgResrcAPI = 'https://i.ytimg.com/vi/';
const axios = require('axios');
const { Playlist, playlists_videos, Video, User } = require('../models/index');

const getSongsByPlaylistId = async (req, res, next) => {
  const { start = 0, total = 5, playlistId } = req.query;
  const userId = req.user.id;

  try {
    const findPlaylist = await Playlist.findByPk(playlistId, {
      include: [
        {
          model: User,
          attributes: ['fullname'],
        },
      ],
    });

    if (!findPlaylist) {
      return res.status(200).json([]);
    }
    const songList = await Video.findAll({
      offset: start,
      limit: total,
      attributes: { exclude: ['playlistId'] },
      include: [
        {
          model: Playlist,
          where: { id: playlistId },
          attributes: [],
        },
      ],
    });

    const totalRecords = await playlists_videos.count({
      where: { playlistId },
    });

    return res
      .status(200)
      .json({ songList: songList, totalRecords, playlistData: findPlaylist });
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};
const verifyVideo = async (id) => {
  try {
    const result = await axios.get(`${ytbVideosAPI}&part=snippet&id=${id}`);
    const data = result.data.items;

    if (data.length > 0) {
      return {
        id,
        title: data[0].snippet.title,
        thumbnail: data[0].snippet.thumbnails.medium.url,
      };
    }
  } catch (err) {
    return null;
  }
  return null;
};

const createVideo = async (req, res, next) => {
  console.log('Hi');
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).end();
    }

    const verifyYtb = await verifyVideo(id);

    if (verifyYtb) {
      let videoExisted = await Video.findByPk(id);
      if (!videoExisted) {
        videoExisted = await Video.create(verifyYtb);
        if (!videoExisted) {
          return res.status(400).end();
        }
      }

      req.addedVideo = videoExisted.dataValues;
      next();
    } else return res.status(404).end();
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
};

module.exports = { verifyVideo, createVideo, getSongsByPlaylistId };
