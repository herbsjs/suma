const checker = require('../checker')
const err = require('../errorCodes')

function allowNull(value, options) {
    if (options === true) return null
    const result = checker.isDefined(value)
    return result ? null : { [err.cantBeNull]: true }
}

module.exports = allowNull 