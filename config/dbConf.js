const { Sequelize } = require('sequelize');
const { DB_URL } = require('./envConf');

const sequelize = new Sequelize(DB_URL);

sequelize.options.logging = false;

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to db');
  } catch (err) {
    console.log('Failed to connect to db');
  }
};

module.exports = { sequelize, connectToDb };
