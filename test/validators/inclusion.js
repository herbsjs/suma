const assert = require("assert");
const { validate, errorCodes } = require("../../src/suma");
const err = errorCodes;

describe("inclusion validation", () => {
  it("does allow empty values", () => {
    const samples = [
      {}, null, "", undefined
    ]
    for (const value of samples) {
      // given
      const validations = { inclusion: {} }
      // when
      const ret = validate(value, validations)
      // then
      assert.deepStrictEqual(ret, { value: value, errors: [] })
    }
  })

  it("allow if the value is included in an string", () => {
    const samples = [
      ["lorem", "lorem ipsum"],
      ["bar", "bar"],
      ["baz", "baz"]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { inclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })



  it("does not allows if the value is not included in an string", () => {
    const samples = [
      ["foo", "text", err.invalidInclusion],
      ["bar", "lorem", err.invalidInclusion],
      ["baz", "ipsum", err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { within: value[1] }

      // given
      const validations = { inclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  it("allow if the value is included in an array", () => {
    const samples = [
      ["foo", ["foo", "bar","baz"]],
      ["bar", ["foo", "bar","baz"]],
      ["baz", ["baz", "bar","baz"]]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { inclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })


  it("does not allow if the value is not included in an array", () => {
    const samples = [
      ["foo", ["x", "y","z"], err.invalidInclusion],
      ["bar", ["a", "b","c"], err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { inclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: value[1]}]
      })
    }
  })

  it("allow if the value is included with option as array", () => {

    var sizes = ["small", "medium", "large"]
    var value = "large"
    // given
    const validations = { inclusion: sizes }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, { value: value, errors: [] })  
  })

  it("does not allow if the value is not included with option as array", () => {

    var sizes = ["small", "medium", "large"]
    var value = "xlarge"
    // given
    const validations = { inclusion: sizes }
    // when
    const ret = validate(value, validations)
    // then
    assert.deepStrictEqual(ret, {    
      value: value,
      errors: [{ [err.invalidInclusion]: sizes }] })  
  })
  
  it("allow value is included in an object", () => {
    const samples = [
      ["foo", { foo: true }],
      ["bar", { bar: true }]
    ]

    for (const value of samples) {

      var options = { within: value[1] }

      // given
      const validations = { inclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: []
      })
    }
  })

  it("does not allow value is not included in an object", () => {
    const samples = [
      ["foo", { bar: true }, err.invalidInclusion],
      ["bar", { foo: true }, err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { within: value[1] }

      // given
      const validations = { inclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  
  it("allow multiple validations with substring included and format with regex valid together", () => {

    //zipcode regex
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541030"]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { inclusion: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })

  
  it("does not allow multiple validations with substring not included and format with regex valid together", () => {

    //zipcode regex
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["05541030", "05541031", err.invalidInclusion]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { inclusion: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: value[1] }] })
    }
  })


  it("does not allow multiple validations with substring included and format with regex not valid together", () => {

    //zipcode regex
    var pattern = /^[0-9]{8}$/

    const samples = [
      ["0554", "05541030", err.invalidFormat]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { inclusion: options, format: pattern, presence: true }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: true }] })
    }
  })
});
