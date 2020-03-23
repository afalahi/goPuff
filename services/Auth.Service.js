// require('dotenv').config()
// const prompt = require('prompt');

// prompt.start()

const apiClient = require('../utils/apiClient');
const {findFactors} = require('../utils/helpers');

/**
  * Class Representing Okta Auth 
 * @class 
 * @property input
 * @member initLogin() - this method will initiate the authentication based on username or phone. If SMS it will challenge the user for SMS so the login method can verify it.If username then the login method will verify a password.
This step enhances the user experience since it will not ask them to send a code if it's phone, and does it automatically
 * @member verify() - This method will validate the SMS or Password against the looked-up userName
 **/
class AuthService {
  constructor(){}
  /**
  * @memberof AuthService
  * @param {Object} user
  * @param {string} user.username - The username
  * @param {string} user.type - The initial login type (username or phone)
  */
  async initLogin(user) {
    try {
      const {username, type} = await user;
      const payload = {username:username};
      let url = ''
      let {data} = await apiClient('/authn', 'POST', payload, null);
      if (type === 'phone') {
        url = findFactors(data, 'sms');
        data = (await apiClient(url, 'POST', {stateToken:data.stateToken}, null)).data;
      }
      else {
        url = findFactors(data, 'password')
      }

      const {stateToken, status} = data;

      return {
          data: data,
          status,
          stateToken,
          url
      };
    }
    catch(e) {
      return Promise.reject(new Error(e.message));
    };
  };

  /**
  * @memberof AuthService
  * @param {string} input - Password or TOTP from SMS challenge
  * @param {object} authState - Previous AuthState
  * @param {object} authState.data - Full Auth Status response
  * @param {string} authState.stateToken - State Token from previous transaction
  * @param {string} authState.status - Transaction status
  * @param {string} authState.url - the verification url
  */
  async verify(input, authState) {
    const {status, stateToken, url} = authState;
    const payload = {stateToken:stateToken}

    try {
      if(status === 'MFA_CHALLENGE') {
        payload.passCode = input
        const {data} = await apiClient(url, 'POST', payload, null)
        if(data.status === "SUCCESS") {
          return data
        }
      }
      else {
        payload.password = input
        const {data} = await apiClient(url, 'POST', payload, null)
        if(data.status === "SUCCESS") {
          return data
        }
      }
    }
    catch(e) {
      return e.message;
    }
  }
}
module.exports = AuthService

// const user = UserService.lookup('(571) 377-8726')
// const auth = new AuthService()
// const authStatus = auth.initLogin(user)

// prompt.get(['code'], (err, result) => {
//   if (err) {return onErr(err)}
//   auth.verify(result.code, authStatus)
// })

// function onErr(err) {
//   console.log(err);
//   return 1
// }