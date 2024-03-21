const Playlist = require('./playlist');
const Video = require('./video');
const User = require('./user');
const playlists_videos = require('./playlist_video');

Playlist.belongsToMany(Video, { through: 'playlists_videos' });
Video.belongsToMany(Playlist, { through: 'playlists_videos' });
User.hasMany(Playlist);
Playlist.belongsTo(User);

playlists_videos.sync({ alter: true });
User.sync({ alter: true });
Playlist.sync({ alter: true });
Video.sync({ alter: true });

// playlists_videos.sync({ alter: false });
// User.sync({ alter: false });
// Playlist.sync({ alter: false });
// Video.sync({ alter: false });

module.exports = {
  User,
  Playlist,
  Video,
  playlists_videos,
};
