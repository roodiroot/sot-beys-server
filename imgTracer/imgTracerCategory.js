const sharp = require('sharp');

module.exports = async (p, nameImg, folder) => {
  await sharp(p)
    .resize(500, 600)
    .jpeg()
    .toFile(`static/${folder}/${nameImg + '.jpeg'}`)
    .then(() => console.log(`${nameImg + '.jpeg'} создан успешно`));
  await sharp(p)
    .resize(500, 600)
    .webp()
    .toFile(`static/${folder}/${nameImg + '.webp'}`)
    .then(() => console.log(`${nameImg + '.webp'} создан успешно`));
};
