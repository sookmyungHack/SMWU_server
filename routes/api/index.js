const express = require('express');
const router = express.Router();
const userRouter = require('../api/user/index');

router.use('/user', userRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;