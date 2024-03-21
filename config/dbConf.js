const { Sequelize } = require('sequelize');
const { DB_URL, DB_PASSWORD } = require('./envConf');

const sequelize = new Sequelize(DB_URL, { password: DB_PASSWORD });

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
