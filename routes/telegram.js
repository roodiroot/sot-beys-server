const Router = require('express');
const telegramController = require('../controllers/telegramController');
const router = new Router();

router.post('/send', telegramController.sendMessage);
router.post('/subscrible', telegramController.newSubscrible);

module.exports = router;
