require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const DB_PASSWORD = process.env.DB_PASSWORD;
const USER_TOKEN_SECRET = process.env.USER_TOKEN_SECRET;
const USER_REFRESH_TOKEN_SECRET = process.env.USER_REFRESH_TOKEN_SECRET;
const YTB_API_URL = process.env.YTB_API_URL;
const YTB_API_KEY = process.env.YTB_API_KEY;

module.exports = {
  PORT,
  DB_URL,
  DB_PASSWORD,
  USER_TOKEN_SECRET,
  USER_REFRESH_TOKEN_SECRET,
  YTB_API_KEY,
  YTB_API_URL,
  NODE_ENV,
};
