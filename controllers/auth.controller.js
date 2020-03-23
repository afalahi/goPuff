const {AuthService, UserService} = require('../services')
const auth = new AuthService()

const initLoginController = async (req, res, next) => {
  try{
    const user = await UserService.lookup(req.body.username)
    const initLogin = await auth.initLogin(user);
    res.json(initLogin)
  }
  catch(e) {
    return next(e)
  }
}

const verifyController = async (req, res, next) => {
  try {
    const authState = {
      status: req.body.status,
      stateToken: req.body.stateToken,
      url:req.body.url
    }
    const input = req.body.pass
    const {sessionToken, expiresAt,status} = await auth.verify(input, authState)
    res.json({sessionToken, expiresAt, status})
  } 
  catch (e) {
    return next(e)
  }
}

module.exports = {
  initLoginController,
  verifyController
}