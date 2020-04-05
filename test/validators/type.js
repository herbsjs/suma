const assert = require('assert')
const { validate, errorCodes } = require('../../src/suma')
const err = errorCodes

describe('type validation', () => {

    class CustomType { }
    class CustomChildType extends CustomType { }

    it('does allows values with correct types', () => {
        const samples = [
            [Number, 0],
            [Number, 1],
            [Number, 1.1],
            [Number, Number.MAX_SAFE_INTEGER],
            [Number, Number.NEGATIVE_INFINITY],
            [Number, Number.POSITIVE_INFINITY],
            [Number, null],
            [String, 'text'],
            [String, ''],
            [String, null],
            [Boolean, true],
            [Boolean, false],
            [Boolean, null],
            [Date, new Date()],
            [Date, new Date('2001-01-01')],
            [Date, null],
            [Object, {}],
            [Object, new Object()],
            [Object, null],
            [Array, []],
            [Array, new Array()],
            [Array, null],
            [CustomType, new CustomType()],
            [CustomChildType, new CustomChildType()],
            [CustomType, new CustomChildType()],

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
            [String, 1],
            [Boolean, 0],
            [Boolean, 1],
            [Date, '2001-01-01'],
            [Date, Date()],
            [Date, Date.now()],
            [Object, 'Object'],
            [Array, 'Array'],
            [CustomType, 1],
            [CustomType, '1'],
            [CustomType, new Date()],
            [CustomType, []],
            [CustomChildType, CustomType],
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


