const checker = require('../checker')
const error = require('../errorCodes')

function email(value) {
  if (checker.isEmpty(value)) return null

  const result = checker.isValidEmail(value)
  return result ? null : { [error.invalidEmail]: true }
}

module.exports = email
