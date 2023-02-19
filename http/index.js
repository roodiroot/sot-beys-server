const axios = require('axios');
require('dotenv').config();

const $message = axios.create({
  url: 'items',
  baseURL: 'https://api.telegram.org',
});

module.exports = $message;
