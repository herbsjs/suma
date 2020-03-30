const checker = require('../checker')
const err = require('../errorCodes')

const typeCheckers = new Map()
typeCheckers.set(String, checker.isString)
typeCheckers.set(Boolean, checker.isBoolean)
typeCheckers.set(Number, checker.isNumber)
typeCheckers.set(Date, checker.isDate)
typeCheckers.set(Object, checker.isObject)
typeCheckers.set(Array, checker.isArray)

function type(value, options) {
    const typeChecker = typeCheckers.get(options)
    if (typeChecker === undefined) throw Error(`Unknown type validator for type "${options}"`)
    const result = typeChecker(value)
    return result ? null : { [err.wrongType]: options.name }
}

module.exports = type 