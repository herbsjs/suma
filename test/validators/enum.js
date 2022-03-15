const assert = require('assert')
const { validate, errorCodes } = require('../../src/suma')
const err = errorCodes

describe('enum validation', () => {
    it('should returns success', () => {
        const list = ['test 1', 'test 2', 'test 3']
        const value = 'test 3'

        //given
        const validations = { enum: list }
        //when
        const ret = validate(value, validations)
        //then
        assert.deepStrictEqual(ret, { value, errors: [] })

    })

    it('should returns error', () => {
        const list = ['test 1', 'test 2', 'test 3']
        const value = 52

        //given
        const validations = { enum: list }
        //when
        const ret = validate(value, validations)
        //then
        assert.deepStrictEqual(ret, { value, errors: [{ [err.invalidValue]: true }] })

    })

    it('should returns error', () => {
        const list = ['test 1', 'test 2', 'test 3']
        const value = true

        //given
        const validations = { enum: list }
        //when
        const ret = validate(value, validations)
        //then
        assert.deepStrictEqual(ret, { value, errors: [{ [err.invalidValue]: true }] })

    })

    it('should returns error', () => {
        const list = ['test 1', 'test 2', 'test 3']
        const value = " "

        //given
        const validations = { enum: list }
        //when
        const ret = validate(value, validations)
        //then
        assert.deepStrictEqual(ret, { value, errors: [{ [err.invalidValue]: true }] })

    })

})


