const express = require('express');
const { PORT, NODE_ENV } = require('./config/envConf');
const userRouter = require('./routes/user');

const cors = require('cors');
const { connectToDb } = require('./config/dbConf');
const requestLogger = require('./middlewares/requestLogger');
const PlayListRouter = require('./routes/playlist');
const videoRouter = require('./routes/video');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(userRouter);
app.use(PlayListRouter);
app.use(videoRouter);
app.use('/', (req, res) => {
  return res.send('Hello from server');
});

const startServer = async () => {
  connectToDb();
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    console.log(`Mode: ${NODE_ENV}`);
  });
};

startServer();
