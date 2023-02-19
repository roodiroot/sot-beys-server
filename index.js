const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const sequelize = require('./db');
require('./models/models.js');
const router = require('./routes/index');
const errorHandling = require('./middleware/errorHandlingMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static', 'product')));
app.use(express.static(path.resolve(__dirname, 'static', 'category')));
app.use(express.static(path.resolve(__dirname, 'static', 'brandLine')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandling);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server started in PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
