const assert = require("assert");
const { validate, errorCodes } = require("../../src/suma");
const err = errorCodes;

describe("exclusion validation", () => {
  it("does allow empty values", () => {
    const samples = [
      {}, null, "", undefined
    ]
    for (const value of samples) {
      // given
      const validations = { exclusion: {} }
      // when
      const ret = validate(value, validations)
      // then
      assert.deepStrictEqual(ret, { value: value, errors: [] })
    }
  })

  it("allow if the value is not included in a string", () => {
    const samples = [
      ["foo", "text"],
      ["bar", "lorem"],
      ["baz", "ipsum"]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { exclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })

  it("does not allows if the value is included in a string", () => {
    const samples = [
      ["foo", "foo", err.invalidExclusion],
      ["bar", "bar", err.invalidExclusion],
      ["baz", "baz", err.invalidExclusion]
    ]

    for (const value of samples) {

      var options = { within: value[1] }

      // given
      const validations = { exclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: [{ [value[2]]: value[1] }]
      })
    }
  })

  it("allow if the value is not included in an array", () => {
    const samples = [
      ["lorem", ["foo", "bar","baz"]],
      ["ipsum", ["foo", "bar","baz"]],
      ["dolor", ["baz", "bar","baz"]]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { exclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [] })
    }
  })


  it("does not allow if the value is included in an array", () => {
    const samples = [
      ["x", ["x", "y","z"], err.invalidExclusion],
      ["a", ["a", "b","c"], err.invalidExclusion]
    ]

    for (const value of samples) {

      var options = { within: value[1] };

      // given
      const validations = { exclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, { value: value[0], errors: [{ [value[2]]: value[1]}]
      })
    }
  })

  it("allow value if is not included in an object", () => {
    const samples = [
      ["foo", { bar: true }],
      ["bar", { foo: true }]
    ]

    for (const value of samples) {

      var options = { within: value[1] }

      // given
      const validations = { exclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: []
      })
    }
  })

  it("does not allow if the value is included in an object", () => {
    const samples = [
      ["foo", { foo: true }, err.invalidExclusion],
      ["bar", { bar: true }, err.invalidExclusion]
    ]

    for (const value of samples) {

      var options = { within: value[1] }

      // given
      const validations = { exclusion: options }
      // when
      const ret = validate(value[0], validations)
      // then
      assert.deepStrictEqual(ret, {
        value: value[0],
        errors: [{ [value[2]]: value[1] }]
      })
    }
  })
});
