const express = require('express');
const router = express.Router();
const userRouter = require('../api/user/index');
const mainRouter = require('../api/main/main');
const categoryRouter = require('../api/category/category');

router.use('/user', userRouter);
router.use('/main', mainRouter);
router.use('/category',categoryRouter);
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;