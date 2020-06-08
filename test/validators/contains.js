const assert = require("assert")
const { validate, errorCodes } = require("../../src/suma")
const err = errorCodes

describe("contains validation", () => {
  it("does allow empty values", () => {
    const samples = [
      {}, null, "", undefined
    ]
    for (const value of samples) {
      // given
      const validations = { contains: {} }
      // when
      const ret = validate(value, validations)
      // then
      assert.deepStrictEqual(ret, { value: value, errors: [] })
    }
  })

  it("allow if the value is included in an string and the conditional is allowed", () => {
    const samples = [
      ["lorem", "lorem ipsum"],
      ["bar", "bar"],
      ["baz", "baz"]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })


  it("allow if the value is not included in a string and the conditional is notAllowed", () => {
    const samples = [
      ["foo", "text"],
      ["bar", "lorem"],
      ["baz", "ipsum"]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })


  it("does not allows if the value is not included in an string and the conditional is allowed", () => {
    const samples = [
      ["foo", "text", err.notContains],
      ["bar", "lorem", err.notContains],
      ["baz", "ipsum", err.notContains]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  it("does not allows if the value is included in a string and the conditional is notAllowed", () => {
    const samples = [
      ["foo", "foo", err.contains],
      ["bar", "bar", err.contains],
      ["baz", "baz", err.contains]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  it("allow if the value is included in an array and the conditional is allowed", () => {
    const samples = [
      ["foo", ["foo", "bar", "baz"]],
      ["bar", ["foo", "bar", "baz"]],
      ["baz", ["baz", "bar", "baz"]]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })


  it("allow if the value is not included in an array and the conditional is notAllowed", () => {
    const samples = [
      ["lorem", ["foo", "bar", "baz"]],
      ["ipsum", ["foo", "bar", "baz"]],
      ["dolor", ["baz", "bar", "baz"]]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })

  it("does not allow if the value is not included in an array and the conditional is allowed", () => {
    const samples = [
      ["foo", ["x", "y", "z"], err.notContains],
      ["bar", ["a", "b", "c"], err.notContains]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0], errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  it("does not allow if the value is included in an array and the conditional is notAllowed", () => {
    const samples = [
      ["x", ["x", "y", "z"], err.contains],
      ["a", ["a", "b", "c"], err.contains]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0], errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  it("allow if the value is included with option as array and the conditional is allowed", () => {

    const sizes = ["small", "medium", "large"]
    const value = "large"

    const options = { allowed: sizes }

    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, { value: value, errors: [] })
  })

  it("allow if the value is not included with option as array and the conditional is notAllowed", () => {

    const sizes = ["small", "medium", "large"]
    const value = "xlarge"
    const options = { notAllowed: sizes }
    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, { value: value, errors: [] })
  })

  it("does not allow if the value is not included with option as array and the conditional is allowed", () => {

    const sizes = ["small", "medium", "large"]
    const value = "xlarge"

    const options = { allowed: sizes }
    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, {
      value: value,
      errors: [{ [err.notContains]: sizes }]
    })
  })

  it("does not allow if the value is included with option as array and the conditional is notAllowed", () => {

    const sizes = ["small", "medium", "large"]
    const value = "large"
    const options = { notAllowed: sizes }
    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, {
      value: value,
      errors: [{ [err.contains]: sizes }]
    })
  })

  it("does not allow if the value is included with option as array and the conditional is notAllowed and if the value is not included with option as array and the conditional is allowed", () => {

    var allowedList = ["small", "medium", "large"]
    var notAllowedList = ["xlarge", "xxlarge", "tiny"]
    const value = 'xlarge'
    var options = { allowed:allowedList, notAllowed: notAllowedList }

    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, {
      value: value,
      errors: [{ [err.notContains]: allowedList },{ [err.contains]: notAllowedList }]
    })
  })

  it("allow value is included in an object and the conditional is allowed", () => {
    const samples = [
      ["type", {type:"Fiat", model:"500", color:"white"}],
      ["price",  {type:"Ford", model:"Mustang", color:"black", price:8000}]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: []
      })
    }
  })

  it("allow value if is not included in an object and the conditional is notAllowed", () => {
    const samples = [
      ["price", {type:"Fiat", model:"500", color:"white"}],
      ["year",  {type:"Ford", model:"Mustang", color:"black", price:8000}]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: []
      })
    }
  })


  it("does not allow value is not included in an object and the conditional is allowed", () => {
    const samples = [
      ["foo", { bar: true }, err.notContains],
      ["bar", { foo: true }, err.notContains]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given 
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  it("does not allow if the value is included in an object", () => {
    const samples = [
      ["foo", { foo: true }, err.contains],
      ["bar", { bar: true }, err.contains]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  it("allow multiple validations with substring is valid in a string and the conditional is allowed and notAllowed together", () => {
    const samples = [
      ["lorem", "hello", "lorem ipsum"],
      ["bar", "foo", "bar"],
      ["baz", "world", "baz"]
    ]

    for (const value of samples) {

      const options = { allowed: value[2], notAllowed: value[1] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })

  it("does not allow multiple validations with substring is invalid in a string and the conditional is allowed and notAllowed together", () => {
    const samples = [
      ["hello", "hello", "hello world", err.contains]
    ]

    for (const value of samples) {

      const options = { allowed: value[1], notAllowed: value[2] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[3]]: value[2] }] })
    }
  })

  it("does not allow multiple validations with substring is valid in a string and the conditional is allowed and notAllowed together", () => {
    const samples = [
      ["lorem", "hello world", "world", err.notContains]
    ]

    for (const value of samples) {

      const options = { allowed: value[1], notAllowed: value[2] }

      // given
      const validations = { contains: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[3]]: value[1] }] })
    }
  })


  it("allow multiple validations with substring included and format with regex valid together and the conditional is allowed", () => {

    //zipcode regex
    const pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541030"]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given
      const validations = { contains: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })

  it("allow multiple validations with substring not included and format with regex valid together and the conditional is notAllowed", () => {

    //zipcode regex
    const pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541031"]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })

  it("does not allow multiple validations with substring not included and format with regex valid together and the conditional is allowed", () => {

    //zipcode regex
    const pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541031", err.notContains]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given
      const validations = { contains: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: value[1] }] })
    }
  })

  it("does not allow multiple validations with substring included and format with regex valid together and the conditional is notAllowed", () => {

    //zipcode regex
    const pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541030", err.contains]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: value[1] }] })
    }
  })

  it("does not allow multiple validations with substring included and format with regex not valid together and the conditional is allowed", () => {

    //zipcode regex
    const pattern = /^[0-9]{8}$/

    const samples = [
      ["0554", "05541030", err.invalidFormat]
    ]

    for (const value of samples) {

      const options = { allowed: value[1] }

      // given
      const validations = { contains: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: true }] })
    }
  })

  it("does not allow multiple validations with substring not included and format with regex not valid together and the conditional is notAllowed", () => {

    //zipcode regex
    const pattern = /^[0-9]{8}$/

    const samples = [
      ["12345", "05541030", err.invalidFormat]
    ]

    for (const value of samples) {

      const options = { notAllowed: value[1] }

      // given
      const validations = { contains: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: true }] })
    }
  })
})
