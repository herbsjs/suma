const assert = require('assert')
const validate = require('../../src/suma')
const err = require('../../src/errorCodes')

describe('allow null validation', () => {

    it('does allows non null values', () => {
        const samples = [
            'text',
            0,
            1,
            false,
            true,
            [null],
            [undefined],
            [1],
            { obj: null },
            () => { },
            {},
            [],
            '',
            ' ',
        ]
        for (const value of samples) {
            const validations = { allowNull: false }
            const ret = validate(value, validations)
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
    })

    it('does not allow null values', () => {
        const samples = [
            null,
            undefined
        ]
        for (const value of samples) {
            const validations = { allowNull: true }
            const ret = validate(value, validations)
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.cantBeNull]: true }] })
        }
    })

    it('does allow null values', () => {
        const samples = [
            null,
            undefined
        ]
        for (const value of samples) {
            const validations = { allowNull: false }
            const ret = validate(value, validations)
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
    })
})