const Router = require('express');
const router = new Router();

const BrandLineCantroller = require('../controllers/brandLineControllers');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', BrandLineCantroller.getAll);
router.post('/', checkRoleMiddleware('ADMIN'), BrandLineCantroller.create);

module.exports = router;
