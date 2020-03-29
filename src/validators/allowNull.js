const checker = require('../checker')
const err = require('../errorCodes')

function allowNull(value, options) {
    const result = checker.isDefined(value)
    return result ? null : { error: err.cantBeNull, values: null }
}

module.exports = allowNull 