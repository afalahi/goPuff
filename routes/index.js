const express = require('express');

const {
  authControllers:{
    initLoginController, 
    verifyController
  },
  accountController
} = require('../controllers');
const {oidc} = require('../middleware');

const router = express.Router();
/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'GoPuff' });
  })
  .get('/address', (req, res, next) => {
    res.render('address')
  })
  .get('/account', oidc.ensureAuthenticated(), accountController)
  .post('/initLogin', initLoginController)
  .post('/verify', verifyController)
module.exports = router;
