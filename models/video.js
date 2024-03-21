const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/dbConf');

class Video extends Model {}

Video.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'video',
  }
);

module.exports = Video;
