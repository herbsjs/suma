const checker = require('../checker')
const err = require('../errorCodes')

function contains(value, options) {
  let results = null
  if (checker.isEmpty(value)) return null

  if (options.allowed && !checker.contains(options.allowed, value)) {
    results = results || []
    results.push({ [err.notContains]: options.allowed })
  }
  if (options.notAllowed && checker.contains(options.notAllowed, value)) {
    results = results || []
    results.push({ [err.contains]: options.notAllowed })
  }
  return results
}

module.exports = contains
