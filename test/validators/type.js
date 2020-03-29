const assert = require('assert')
const validate = require('../../src/suma')
const err = require('../../src/errorCodes')

describe('type validation', () => {

    function validateTypeTest(type, value) {
        const validations = { type: type }
        return validate(value, validations)
    }

    it('does allows values with correct types', () => {
        const samples = [
            [Number, 0],
            [Number, 1],
            [Number, 1.1],
            [Number, Number.MAX_SAFE_INTEGER],
            [Number, Number.NEGATIVE_INFINITY],
            [Number, Number.POSITIVE_INFINITY],
            [String, 'text'],
            [String, ''],
            [Boolean, true],
            [Boolean, false],
            [Date, new Date()],
            [Date, new Date('2001-01-01')],
            [Object, {}],
            [Object, new Object()],
            [Array, []],
            [Array, new Array()],
        ]
        for (const value of samples) {
            const ret = validateTypeTest(value[0], value[1])
            assert.deepStrictEqual(ret, { value: value[1], errors: [] })
        }
    })

    it('does not allows values with incorrect types', () => {
        const samples = [
            [Number, 'a'],
            [Number, null],
            [String, 1],
            [String, null],
            [Boolean, 0],
            [Boolean, 1],
            [Boolean, null],
            [Date, '2001-01-01'],
            [Date, Date()],
            [Date, Date.now()],
            [Date, null],
            [Object, 'Object'],
            [Object, null],
            [Array, 'Array'],
            [Array, null],
        ]
        for (const value of samples) {
            const ret = validateTypeTest(value[0], value[1])
            assert.deepStrictEqual(ret, { value: value[1], errors: [{ error: err.wrongType, values: { type: value[0].name } }] })
        }
    })
})


