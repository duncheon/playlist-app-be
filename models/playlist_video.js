const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/dbConf');

const playlists_videos = sequelize.define(
  'playlists_videos',
  {
    createAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  { timestamps: false, underscored: true, freezeTableName: true }
);

module.exports = playlists_videos;
