const assert = require('assert')
const validate = require('../../src/suma')
const err = require('../../src/errorCodes')

describe('type validation', () => {

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
            // given
            const validations = { type: value[0] }
            // when
            const ret = validate(value[1], validations)
            // then
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
            // given
            const validations = { type: value[0] }
            // when
            const ret = validate(value[1], validations)
            // then
            assert.deepStrictEqual(ret, { value: value[1], errors: [{ [err.wrongType]: value[0].name }] })
        }
    })
})


