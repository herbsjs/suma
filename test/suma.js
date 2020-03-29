const assert = require('assert')
const validate = require('../src/suma')
const err = require('../src/errorCodes')

describe('suma', () => {

    describe('valid validators', () => {

        it('multiple validators with valid value', () => {
            const value = 'text'
            const validations = {
                presence: true,
                allowNull: false,
                type: String,
                length: {
                    minimum: 3,
                    maximum: 5,
                    is: 4
                }
            }
            const ret = validate(value, validations)
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        })

        it('multiple validators with invalid value', () => {
            const value = 'text'
            const validations = {
                presence: true,
                allowNull: false,
                type: Number,
                length: {
                    minimum: 5,
                    maximum: 3,
                    is: 3
                }
            }
            const ret = validate(value, validations)
            assert.deepStrictEqual(ret, {
                value: value,
                errors: [
                    { error: err.wrongType, values: { type: 'Number' } },
                    { error: err.isTooShort, values: { length: 5 } },
                    { error: err.isTooLong, values: { length: 3 } },
                    { error: err.isWrongLength, values: { length: 3 } },
                ]
            })
        })

    })


    describe('invalid validators', () => {

        it('should throw an error', (done) => {
            const value = 1
            const validations = { notAValidValidator: true }
            try {
                const ret = validate(value, validations)
                done('Error')
            }
            catch (err) {
                assert.deepStrictEqual(err.message, 'Unknown validator "notAValidValidator"')
                done()
            }
        })

    })
})
