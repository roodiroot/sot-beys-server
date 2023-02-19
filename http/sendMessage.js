const $message = require('./index');

const sendMessageOnTelegram = async (text) => {
  const response = $message.post(`/bot${process.env.TELEGRAM_API_KEY}/sendMessage`, {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    parse_mode: 'html',
    text,
  });
  return response;
};

module.exports = sendMessageOnTelegram;
