/**
 * Returns a login value and type
 * @param {string} input - phone or email
 */
function formatPhoneNumber(input) {
  try {
    const cleaned = ('' + input).replace(/\D/g, '');
    const isNumber = Number.isInteger(parseInt(cleaned));
    if(!isNumber) {
      const match = input.match(/^([\w\d\-\.]+)@{1}(([\w\d\-]{1,67})|([\w\d\-]+\.[\w\d\-]{1,67}))\.(([a-zA-Z\d]{2,4})(\.[a-zA-Z\d]{2})?)$/)
      console.log(match)
      return {
        login:input,
        type:'username'
      }
    }
    else if (isNumber) {
      const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if(match) {
        return {
          login:match[0],
          type:'phone'
        }
      }
      else {
        throw new Error("Not a valid number")
      }
    }
  }
  catch (e) {
    return e
  }
}
console.log(formatPhoneNumber("ali@gmail.com‬"))
module.exports = formatPhoneNumber;