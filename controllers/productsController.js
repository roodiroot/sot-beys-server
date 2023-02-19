const { Product, ProductInfo } = require('../models/models');
const ApiError = require('../error/apiError');
const imgCombainer = require('../imgTracer/imgCombainer');
const translateFunc = require('../imgTracer/translateFunc');

class ProductController {
  async create(req, res, next) {
    try {
      let { name, price, categoryId, brandLineId, info } = req.body;
      const { img } = req.files;
      let arrImg = [];
      if (name && price) {
        if (img.length > 5) {
          return next(ApiError.bedRequest('Превышен лимит изобразительных исскуств'));
        }
        if (img.length === undefined) {
          imgCombainer(img, arrImg);
        } else {
          for (let i = 0; i < img.length; i++) {
            imgCombainer(img[i], arrImg);
          }
        }
        const path = translateFunc(name);
        const product = await Product.create({
          name,
          price,
          img: arrImg,
          categoryId,
          brandLineId,
          path,
        });
        if (info) {
          info = JSON.parse(info);
          info.forEach((i) => {
            ProductInfo.create({
              title: i.title,
              description: i.description,
              productId: product.id,
            });
          });
        }
        return res.json(product);
      } else {
        return next(ApiError.bedRequest('Вы не указали всего того что необходимо указать'));
      }
    } catch (e) {
      next(ApiError.bedRequest(e.message));
    }
  }
  async getAll(req, res) {
    let products;
    let { categoryId, brandLineId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    if (!categoryId && !brandLineId) products = await Product.findAndCountAll({ limit, offset });
    if (categoryId && !brandLineId)
      products = await Product.findAndCountAll({ where: { categoryId }, limit, offset });
    if (!categoryId && brandLineId)
      products = await Product.findAndCountAll({ where: { brandLineId }, limit, offset });
    if (categoryId && brandLineId)
      products = await Product.findAndCountAll({
        where: { brandLineId, categoryId },
        limit,
        offset,
      });

    return res.json(products);
  }
  async getOne(req, res) {
    const { path } = req.params;

    const product = await Product.findOne({
      where: { path },
      include: [{ model: ProductInfo, as: 'info' }],
    });
    return res.json(product);
  }
}
module.exports = new ProductController();
