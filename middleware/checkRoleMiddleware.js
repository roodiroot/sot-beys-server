const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (role) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') next();
    try {
      const webToken = req.headers.authorization;
      if (!webToken) {
        return res.status(401).json('Пользователь не авторизован');
      }
      const decoded = jwt.verify(webToken.split(' ')[1], process.env.SEKRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json('Не достаточно прав для данного действия');
      }
      req.u = decoded;
      next();
    } catch (e) {
      return res.status(401).json('Пользователь не авторизован');
    }
  };
};
