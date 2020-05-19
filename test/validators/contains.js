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

      var options = { allowed: value[1] }

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

      var options = { notAllowed: value[1] }

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
      ["foo", "text", err.invalidInclusion],
      ["bar", "lorem", err.invalidInclusion],
      ["baz", "ipsum", err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { allowed: value[1] }

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
      ["foo", "foo", err.invalidExclusion],
      ["bar", "bar", err.invalidExclusion],
      ["baz", "baz", err.invalidExclusion]
    ]

    for (const value of samples) {

      var options = { notAllowed: value[1] }

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

      var options = { allowed: value[1] }

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

      var options = { notAllowed: value[1] }

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
      ["foo", ["x", "y", "z"], err.invalidInclusion],
      ["bar", ["a", "b", "c"], err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { allowed: value[1] }

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
      ["x", ["x", "y", "z"], err.invalidExclusion],
      ["a", ["a", "b", "c"], err.invalidExclusion]
    ]

    for (const value of samples) {

      var options = { notAllowed: value[1] }

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

    var sizes = ["small", "medium", "large"]
    var value = "large"

    var options = { allowed: sizes }

    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, { value: value, errors: [] })
  })

  it("allow if the value is not included with option as array and the conditional is notAllowed", () => {

    var sizes = ["small", "medium", "large"]
    var value = "xlarge"
    var options = { notAllowed: sizes }
    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, { value: value, errors: [] })
  })

  it("does not allow if the value is not included with option as array and the conditional is allowed", () => {

    var sizes = ["small", "medium", "large"]
    var value = "xlarge"

    var options = { allowed: sizes }
    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, {
      value: value,
      errors: [{ [err.invalidInclusion]: sizes }]
    })
  })

  it("does not allow if the value is included with option as array and the conditional is allowed", () => {

    var sizes = ["small", "medium", "large"]
    var value = "large"
    var options = { notAllowed: sizes }
    // given
    const validations = { contains: options }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, {
      value: value,
      errors: [{ [err.invalidExclusion]: sizes }]
    })
  })


  it("allow value is included in an object and the conditional is allowed", () => {
    const samples = [
      ["foo", { foo: true }],
      ["bar", { bar: true }]
    ]

    for (const value of samples) {

      var options = { allowed: value[1] }

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
      ["foo", { bar: true }],
      ["bar", { foo: true }]
    ]

    for (const value of samples) {

      var options = { notAllowed: value[1] }

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
      ["foo", { bar: true }, err.invalidInclusion],
      ["bar", { foo: true }, err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { allowed: value[1] }

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
      ["foo", { foo: true }, err.invalidExclusion],
      ["bar", { bar: true }, err.invalidExclusion]
    ]

    for (const value of samples) {

      var options = { notAllowed: value[1] }

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

      var options = { allowed: value[2], notAllowed: value[1] }

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
      ["hello", "hello", "hello world", err.invalidExclusion]
    ]

    for (const value of samples) {

      var options = { allowed: value[1], notAllowed: value[2] }

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
      ["lorem", "hello world", "world", err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { allowed: value[1], notAllowed: value[2] }

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
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541030"]
    ]

    for (const value of samples) {

      var options = { allowed: value[1] }

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
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541031"]
    ]

    for (const value of samples) {

      var options = { notAllowed: value[1] }

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
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541031", err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { allowed: value[1] }

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
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541030", err.invalidExclusion]
    ]

    for (const value of samples) {

      var options = { notAllowed: value[1] }

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
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["0554", "05541030", err.invalidFormat]
    ]

    for (const value of samples) {

      var options = { allowed: value[1] }

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
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["12345", "05541030", err.invalidFormat]
    ]

    for (const value of samples) {

      var options = { notAllowed: value[1] }

      // given
      const validations = { contains: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: true }] })
    }
  })
})
