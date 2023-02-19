const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  try {
    const webToken = req.headers.authorization;
    if (!webToken) {
      return res.status(402).json('Пользователь не авторизован');
    }
    const decoded = jwt.verify(webToken.split(' ')[1], process.env.SEKRET_KEY);
    req.u = decoded;
    next();
  } catch (e) {
    return res.status(402).json('Пользователь не авторизован');
  }
};
