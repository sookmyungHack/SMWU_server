const express = require('express');
const router = express.Router();
const userRouter = require('../api/user/index');
const mainRouter = require('../api/main/main')

router.use('/user', userRouter);
router.use('/main', mainRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;