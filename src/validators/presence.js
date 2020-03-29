const checker = require('../checker')
const err = require('../errorCodes')

function presence(value, options) {
    const result = checker.isEmpty(value)
    return result ? { error: err.cantBeEmpty, values: null } : null
}

module.exports = presence 