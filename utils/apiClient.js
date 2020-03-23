const axios = require('axios').default;

/**
 * @param {string} url - the url to the endpoint. If you include url params you need to encode them
 * @param {string} method=get - the HTTP method. Default is GET
 * @param {object} data - The data is required for POST, Put methods
 * @param {string} token - The Okta API token
 */
const apiClient = async (url, method, data, token) => {
  const options = {
    url:url,
    method:method
  }
  if(data) {
    options.data = data
  }
  const client = axios.create({
    baseURL: `${process.env.OKTA_URL}${process.env.OKTA_API}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
  if(token) {
    client.defaults.headers.common['Authorization'] = process.env.OKTA_API_TOKEN
  }
  try {
    const res = await client.request(options)
    return res
  }
  catch(e) {
    if(e.response) {
      return Promise.reject(new Error(e.message));
    }
    return Promise.reject(new Error(e));
  }
}

module.exports = apiClient