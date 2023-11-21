const checker = require('../checker.js')
const { isPotentialDate } = require('./isPotentialDate.js')

const parsers = () => ({
    String: String,
    Number: (value) => {
        // check if the value is a string and is empty
        if (typeof value === 'string' && value.trim() === '') return value
        const tryParse = Number(value)
        if (isNaN(tryParse)) return value
        return tryParse
    },
    Boolean: Boolean,
    Date: (value) => {
        if (!isPotentialDate(value)) return value
        const tryParse = new Date(value)
        if (isNaN(tryParse)) return value // 'Invalid Date'
        return tryParse
    },
    Object: (value) => {
        const tryParse = Object(value)
        if ([String, Number, Boolean, Object, Array].find(T => tryParse instanceof T))
            return tryParse.valueOf()
        return tryParse
    },
    Array: (value) => Array.of(value),
})

function tryParse(value, type) {
    try {
        // ignore null or undefined values
        if (value === null || value === undefined) return value

        // ignore if the value is already the correct type
        if (value instanceof type) return value

        // ignore functions
        if (checker.isFunction(value)) return value

        const parser = parsers()[type.name]
        return parser(value)
    } catch (error) {
        return value
    }
}

module.exports = { tryParse }