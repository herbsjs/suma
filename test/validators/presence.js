const assert = require('assert')
const validate = require('../../src/suma')
const err = require('../../src/errorCodes')

describe('presence validation', () => {

    it('does allows non empty values', () => {
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
            () => { }
        ]
        for (const value of samples) {
            const validations = { presence: true }
            const ret = validate(value, validations)
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
    })

    it('does not allow empty values', () => {
        const samples = [
            {},
            [],
            '',
            ' ',
            null,
            undefined
        ]
        for (const value of samples) {
            const validations = { presence: false }
            const ret = validate(value, validations)
            assert.deepStrictEqual(ret, { value: value, errors: [{ error: err.cantBeEmpty, values: null }] })
        }
    })
})