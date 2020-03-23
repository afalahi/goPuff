const ExpressOIDC = require('@okta/oidc-middleware').ExpressOIDC;

const oidc = new ExpressOIDC({
  issuer: `${process.env.OKTA_URL}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  appBaseUrl: 'http://localhost:3000',
  scope: "openid profile email",
  routes:{
    login:{
      viewHandler:(req, res, next) =>{
        res.render('login', {
          title:"Login",
          csrfToken:req.csrfToken()
        })
      }
    }
  }
});

module.exports = oidc;