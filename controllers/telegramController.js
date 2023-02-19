const ApiError = require('../error/apiError');
const sendMessageOnTelegram = require('../http/sendMessage');

class TelegramController {
  async sendMessage(req, res, next) {
    try {
      const { name, count, price, total, description, totalSumm, commentValue, promocodeValue } =
        req.body;
      let arr = [];
      let product = '';

      if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
          product = `<b>${name[i]}</b> \n<b>цена:</b> ${price[i]} \n
           <b>в количестве:</b> ${count[i]}шт \n <b>описание:</b> ${description[i]} \n
            <b>стоимость:</b> ${total[i]} \n `;
          arr.push(product);
        }
      } else {
        product = `<b>${name}</b> \n<b>цена:</b> ${price} \n
         <b>в количестве:</b> ${count}шт \n <b>описание:</b>
          ${description} \n <b>стоимость:</b> ${total} \n `;
        arr.push(product);
      }

      let message = `<b>Новый заказ</b> \n
        ${arr} Стоимость заказа: <b>${totalSumm},00 ₽</b> \n 
       Введенный промокод: <b>"${promocodeValue}"</b> 
        <em>${commentValue}</em>`;

      await sendMessageOnTelegram(message).then((d) => res.json({ zaebis: d.status }));
    } catch (error) {
      next(ApiError.bedRequest(error.message));
    }
  }
  async newSubscrible(req, res) {
    const alarm = '<b>У вас новый подписчик</b>';
    await sendMessageOnTelegram(alarm).then((d) => res.json({ zaebis: d.status }));
  }
}

module.exports = new TelegramController();
