const Router = require('express');
const router = new Router();

const ProductController = require('../controllers/productsController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', ProductController.getAll);
router.get('/:path', ProductController.getOne);
router.post('/', checkRoleMiddleware('ADMIN'), ProductController.create);

module.exports = router;
