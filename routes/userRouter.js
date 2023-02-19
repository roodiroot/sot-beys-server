const Router = require('express');
const router = new Router();

const UserController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/auth', authMiddleware, UserController.check);
router.post('/registration', UserController.registration);
router.post('/login', UserController.login);

module.exports = router;
