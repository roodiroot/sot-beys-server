const Router = require('express');
const router = new Router();

const CategoryCantroller = require('../controllers/categoryControllers');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', CategoryCantroller.getAll);
router.get('/:path', CategoryCantroller.getOne);
router.post('/', checkRoleMiddleware('ADMIN'), CategoryCantroller.create);

module.exports = router;
