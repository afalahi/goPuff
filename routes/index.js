const express = require('express');

const {authControllers:{initLoginController, verifyController}} = require('../controllers');

const router = express.Router();
/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'GoPuff' });
  })
  .get('/address', (req, res, next) => {
    res.render('address')
  })
  .post('/initLogin', initLoginController)
  .post('/verify', verifyController)

module.exports = router;
