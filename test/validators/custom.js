const assert = require('assert')
const { validate } = require('../../src/suma')

describe('custom validation', () => {
  describe('single validation', () => {
    const invalidNameValidation = {
      custom: {
        invalidName: (value) => {
          if (!value || !value.length) {
            return false
          }

          const parts = value.split(' ')
          if (parts.length < 2) {
            return false
          }

          return parts[0].length > 2 && parts[1].length > 3
        },
      },
    }

    it('does not allow invalid values', () => {
      //given
      const samples = [{}, [], '', ' ', null, undefined, 'li xi']

      for (const value of samples) {
        //when
        const ret = validate(value, invalidNameValidation)

        //then
        assert.deepStrictEqual(ret, {
          value: value,
          errors: [
            {
              invalidName: true,
            },
          ],
        })
      }
    })

    it('allow valid name', () => {
      //given
      const name = 'Edson Arantes'

      const ret = validate(name, invalidNameValidation)

      //then
      assert.deepStrictEqual(ret, {
        value: name,
        errors: [],
      })
    })
  })

  describe('many validations', () => {
    const validateCardNumber = {
      custom: {
        invalidCardNumber: (value) => value.length < 6,
        invalidLastDigit: (value) => value[value.length - 1] === '7',
      },
    }

    it('does not allow invalid card number', () => {
      // given
      const value = '123456'

      // when
      const ret = validate(value, validateCardNumber)

      // then
      assert.deepStrictEqual(ret, {
        value: value,
        errors: [
          {
            invalidCardNumber: true,
          },
          {
            invalidLastDigit: true,
          },
        ],
      })
    })
  })
})
