const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/dbConf');
const { Sequelize } = require('sequelize');

class Playlist extends Model {}
Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    createAt: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'playlist',
  }
);

module.exports = Playlist;
