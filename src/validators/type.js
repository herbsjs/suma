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
    // ignore Null
    if (!checker.isDefined(value)) return null

    let typeChecker = typeCheckers.get(options)
    if (typeChecker === undefined) typeChecker = checker.isInstanceOf
    const result = typeChecker(value, options)
    return result ? null : { [err.wrongType]: options.name }
}

module.exports = type 