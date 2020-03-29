const assert = require('assert')
const validate = require('../../src/suma')
const err = require('../../src/errorCodes')

describe('length validation', () => {

    it('does allows values with the right length', () => {
        const samples = [
            ['text', { minimum: 0 }],
            ['text', { maximum: 100 }],
            ['text', { is: 4 }]
        ]
        for (const value of samples) {
            const validations = { length: value[1] }
            const ret = validate(value[0], validations)
            assert.deepStrictEqual(ret, { value: value[0], errors: [] })
        }
    })

    it('does allows values with the right length with multiple params', () => {
        const value = 'text'
        const length = { minimum: 0, maximum: 100, is: 4 }
        const validations = { length: length }
        const ret = validate(value, validations)
        assert.deepStrictEqual(ret, { value: value, errors: [] })
    })

    it('does not allows values with the wrong length', () => {
        const samples = [
            ['text', 'minimum', 5, err.isTooShort],
            ['text', 'maximum', 3, err.isTooLong],
            ['text', 'is', 3, err.isWrongLength],
        ]
        for (const value of samples) {
            const lengthObj = {}
            lengthObj[value[1]] = value[2]
            const validations = { length: lengthObj }
            const ret = validate(value[0], validations)
            assert.deepStrictEqual(ret, { value: value[0], errors: [{ error: value[3], values: { length: value[2] } }] })
        }
    })

    it('does not allows values with the wrong length with multiple params', () => {
        const value = 'text'
        const length = { minimum: 5, maximum: 3, is: 3 }
        const validations = { length: length }
        const ret = validate(value, validations)
        assert.deepStrictEqual(ret, {
            value: value,
            errors: [
                { error: err.isTooShort, values: { length: 5 } },
                { error: err.isTooLong, values: { length: 3 } },
                { error: err.isWrongLength, values: { length: 3 } },
            ]
        })
    })
})