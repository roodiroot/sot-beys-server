const { Category } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const imgTracerCategory = require('../imgTracer/imgTracerCategory');
const ApiError = require('../error/apiError');
const translateFunc = require('../imgTracer/translateFunc');

class CategoryCantroller {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const { img } = req.files;
      if (img.length > 1) {
        return next(ApiError.bedRequest('Максимум к загрузке ОДНО изображение'));
      }

      const imgName = uuid.v4();
      const p = path.resolve(__dirname, '..', 'static', imgName + '.jpeg');
      img
        .mv(p)
        .then(() => imgTracerCategory(p, imgName, 'category'))
        .then(() =>
          fs.unlink(p, (err) => {
            if (err) throw err; // не удалось удалить файл
            console.log('Файл успешно удалён');
          }),
        );

      const urlName = translateFunc(name);

      const category = await Category.create({ name, path: urlName, img: imgName });
      res.json(category);
    } catch (error) {
      next(ApiError.bedRequest(error.message));
    }
  }
  async getAll(req, res) {
    const { id } = req.query;
    if (id) {
      const categoryes = await Category.findOne({ where: { id } });
      return res.json(categoryes);
    }
    const categoryes = await Category.findAll();
    res.json(categoryes);
  }
  async getOne(req, res, next) {
    try {
      const { path } = req.params;
      if (path) {
        const category = await Category.findOne({
          where: { path },
        });
        return res.json(category);
      }
    } catch (error) {
      next(ApiError.bedRequest(error.message));
    }
  }
}
module.exports = new CategoryCantroller();
