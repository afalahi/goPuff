const apiClient = require('./apiClient');

/**
 * @param {string} input - email or phone number
 */
async function userLookup(input) {
  const cleaned = ('' + input).replace(/\D/g, '')
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    try {
      const url = `/users?search=profile.mobilePhone%20eq%20%22${match[0]}%22%20and%20status%20eq%20%22ACTIVE%22`
      const res = await apiClient(url,'get', null, process.env.OKTA_API_TOKEN)
      if (res.data.length > 1) {
        return Promise.reject(new Error("Sorry, but the number you entered is registered to more than one person. Please login with email and password"))
      }
      if (res.data.length <= 0) {
        return Promise.reject(new Error("User doesn't exist"))
      }
      return {
        login:res.data[0].profile.login,
        type:'phone'
      }
    }
    catch(e){
      return Promise.reject(new Error(e.message));
    }
  }
  else {
    return {
      login:input,
      type: 'username'
    }
  }
}
module.exports = userLookup
