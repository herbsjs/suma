const err = require('../errorCodes')

function validateEnum(value, list) {
    const exists = list.some(item => item === value)
    if (exists) return null

    return { [err.invalidValue]: true }
}

module.exports = validateEnum