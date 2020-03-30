const express = require('express');

const {
  authControllers:{
    initLoginController, 
    verifyController
  },
  profileController
} = require('../controllers');
const {isAuthenticated} = require('../middleware');

const router = express.Router();
/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'GoPuff' });
  })
  .get('/address', (req, res, next) => {
    res.render('address')
  })
  .get('/profile', isAuthenticated, profileController)
  .post('/initLogin', initLoginController)
  .post('/verify', verifyController)
module.exports = router;
