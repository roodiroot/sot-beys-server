const sharp = require('sharp');

module.exports = async (p, nameImg) => {
  await sharp(p)
    .resize(500, 700)
    .jpeg()
    .toFile(`static/product/${nameImg.split('.')[0] + '.max.jpeg'}`)
    .then(() => console.log(`${nameImg.split('.')[0] + '.max.jpeg'} создан успешно`));
  await sharp(p)
    .resize(500, 700)
    .webp()
    .toFile(`static/product/${nameImg.split('.')[0] + '.max.webp'}`)
    .then(() => console.log(`${nameImg.split('.')[0] + '.max.webp'} создан успешно`));
  await sharp(p)
    .resize(150, 150)
    .jpeg()
    .toFile(`static/product/${nameImg.split('.')[0] + '.min.jpeg'}`)
    .then(() => console.log(`${nameImg.split('.')[0] + '.min.jpeg'} создан успешно`));
  await sharp(p)
    .resize(150, 150)
    .webp()
    .toFile(`static/product/${nameImg.split('.')[0] + '.min.webp'}`)
    .then(() => console.log(`${nameImg.split('.')[0] + '.min.webp'} создан успешно`));
};
