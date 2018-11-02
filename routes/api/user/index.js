const express = require('express');
const router = express.Router();
const loginRouter = require('./login');

router.use('/login',loginRouter);


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

module.exports = router;