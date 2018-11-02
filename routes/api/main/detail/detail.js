const express = require('express');
const router = express.Router();
const db = require('../../../../module/db')
const jwt = require('../../../../module/jwt');
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
  });
  

module.exports = router;