//axios is an Node/React JS http client library
//a custom scope is needed for this flow to work
//the /default/ is the authorization server id, if you create a custom one then you need to make sure the url reflects that
const axios = require('axios').default;

const client_id = '0oa2k1oiyrQY6yAWX357';
const client_secret = 'LkytQGM5pwWBnhmALmqK1Ior9cJ45zKq5T1KlPkQ';
const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const get_token = async () => {
  try {
    const res = await axios.request({
      url: 'https://middle-earth.okta.com/oauth2/default/v1/token',
      method:'POST',
      headers:{
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
        'Authorization': `Basic ${basicAuth}`
      },
      data: 'grant_type=client_credentials&scope=xy_coordinates'
    })
    console.log(res.data)
    return res.data
  }
catch(e) {
    console.error(e.message);
  }
}
get_token()