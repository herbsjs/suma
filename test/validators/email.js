const assert = require('assert')
const { validate, errorCodes } = require('../../src/suma')
const err = errorCodes

describe('email validation', () => {
  it('does allow empty values', () => {
    const samples = ['', null, undefined, {}]

    for (const value of samples) {
      //given
      const validations = { email: true }
      //when
      const ret = validate(value, validations)
      //then
      assert.deepStrictEqual(ret, { value: value, errors: [] })
    }
  })

  it('does not allow non strings', function () {
    const samples = [
      false,
      Date(),
      { key: "i'm a key" },
      ['a', 'b', 'c'],
      100,
      1.0,
    ]

    for (const value of samples) {
      //given
      const validations = { email: true }
      //when
      const ret = validate(value, validations)
      //then
      assert.deepStrictEqual(ret, {
        value,
        errors: [{ [err.invalidEmail]: true }],
      })
    }
  }),

  it('allows valid email', () => {
    const samples = [
      'simple@example.com',
      'very.common@example.com',
      'disposable.style.email.with+symbol@example.com',
      'other.email-with-hyphen@example.com',
      'fully-qualified-domain@example.com',
      'user.name+tag+sorting@example.com',
      'x@example.com',
      'example-indeed@strange-example.com',
      'ex_am3ple@s.example',
      'mailhost!username@example.us',
      'user%example.com@example.org',
      '"john..doe"@example.org',
      'my@email.com.de'
    ]

    for (const value of samples) {
      //given
      const validations = { email: true }
      //when
      const ret = validate(value, validations)
      //then
      assert.deepStrictEqual(ret, {
        value,
        errors: [],
      })
    }
  }),

  it('does not allow invalid emails', function () {
    const samples = [
     "abc.example.com",
     "a@b@c@example.com",
     "a\"b(c)d,e:f;g<h>i[j\k]l@example.com",
     "just\"not\"right@example.com",
     "this is\"not\allowed@example.com",
     "this\ still\"not\\allowed@example.com",
     "@example.com",
     "üñîçøðé@example.com",
     "foobar",
     "foobar@",
     "\" \"@example.com",
     "google.com",      
    ]

    for (const value of samples) {
      //given
      const validations = { email: true }
      //when
      const ret = validate(value, validations)
      //then
      assert.deepStrictEqual(ret, {
        value,
        errors: [{ [err.invalidEmail]: true }],
      })
    }
  })

  it('allows multiple validations', () => {
    const samples = [
      'simple@example.com',
      'very.common@example.com',
      'disposable.style.email.with+symbol@example.com',
      'other.email-with-hyphen@example.com',
      'fully-qualified-domain@example.com',
      'user.name+tag+sorting@example.com',
      'x@example.com',
      'example-indeed@strange-example.com',
      'ex_am3ple@s.example',
      'mailhost!username@example.us',
      'user%example.com@example.org',
      '"john..doe"@example.org',
      'my@email.com.de'
    ]

    for (const value of samples) {
      //given
      const validations = { email: true, presence: true }
      //when
      const ret = validate(value, validations)
      //then
      assert.deepStrictEqual(ret, {
        value,
        errors: [],
      })
    }
  })
})
