const imgTracer = require('./imgTracer');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

module.exports = (img, arr) => {
  const fileName = uuid.v4() + '.jpg';
  const p = path.resolve(__dirname, '..', 'static', fileName);
  arr.push(fileName.split('.')[0]);
  img
    .mv(p)
    .then(() => imgTracer(p, fileName))
    .then(() =>
      fs.unlink(p, (err) => {
        if (err) throw err; // не удалось удалить файл
        console.log('Файл успешно удалён');
      }),
    );
};
