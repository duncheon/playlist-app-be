const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/dbConf');

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.TEXT,
    },
    fullname: {
      type: DataTypes.TEXT,
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
    modelName: 'user',
  }
);

module.exports = User;
