/**
 * Returns a login value and type
 * @param {string} input - phone or email
 */
function formatPhoneNumber(input) {
  const cleaned = ('' + input).replace(/\D/g, '')
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return {
        login:match[0],
        type:'phone'
      }
  }
  return {
    login:input,
    type:'username'
  }
}
module.exports = formatPhoneNumber