const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ApiError = require('../error/apiError');
const { User, Cart } = require('../models/models');

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SEKRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res, next) {
    let { email, password, role } = req.body;
    if (!email || !password) return next(ApiError.bedRequest('Введите все необхоимые данные'));
    const candidate = await User.findOne({ where: { email } });
    if (candidate)
      return next(ApiError.bedRequest('Пользователь с таким e`mail уже зарегестрирован  '));
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword, role });
    const cart = await Cart.create({ userId: user.id });
    const webToken = generateJwt(user.id, email, user.role);
    return res.json(webToken);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return next(ApiError.bedRequest('Пользователь с таким email не найден'));
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) return next(ApiError.bedRequest('Пароль не верный'));
    const webToken = generateJwt(user.id, user.email, user.role);
    return res.json(webToken);
  }
  async check(req, res, next) {
    const webToken = generateJwt(req.u.id, req.u.email, req.u.role);
    res.json({ webToken });
  }
}
module.exports = new UserController();
