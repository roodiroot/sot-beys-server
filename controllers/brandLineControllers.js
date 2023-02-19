const ApiError = require('../error/apiError');
const { BrandLine } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const imgTracerCategory = require('../imgTracer/imgTracerCategory');
const translateFunc = require('../imgTracer/translateFunc');

class BrandLineCantroller {
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
        .then(() => imgTracerCategory(p, imgName, 'brandLine'))
        .then(() =>
          fs.unlink(p, (err) => {
            if (err) throw err; // не удалось удалить файл
            console.log('Файл успешно удалён');
          }),
        );

      const urlName = translateFunc(name);

      const brandLine = await BrandLine.create({ name, path: urlName, img: imgName });
      return res.json(brandLine);
    } catch (error) {
      next(ApiError.bedRequest(error.message));
    }
  }

  async getAll(req, res) {
    const brandLines = await BrandLine.findAll();
    res.json(brandLines);
  }
}
module.exports = new BrandLineCantroller();
