const Router = require('express');
const router = new Router();

const productRouter = require('./productRouter');
const brandLineRouter = require('./brandLine');
const categoryRouter = require('./category');
const userRouter = require('./userRouter');
const messageRouter = require('./telegram');

router.use('/product', productRouter);
router.use('/brand-line', brandLineRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/telegram', messageRouter);

module.exports = router;
