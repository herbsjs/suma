const assert = require("assert")
const { validate, errorCodes } = require("../../src/suma")
const err = errorCodes

describe("javascriptIdentifier validation", () => {
    it('does not allow empty values', () => {

        const samples = [
            {},
            null,
            '',
            undefined
        ]
        for (const value of samples) {
            // given
            const validations = { javascriptIdentifier: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.cantBeEmpty]: true }] })
        }
    })

    it("does not allow non strings", function () {

        const samples = [
            3.14,
            192.168,
            true,
            { key: "i'm a string" }
        ]

        for (const value of samples) {
            // given
            const validations = { javascriptIdentifier: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.invalidJavascriptIdentifier]: true }] })
        }

    })


    it("does not allow 'invalid' javascriptIdentifiers", function () {

        const samples = [
            "http://",
            "//",
            "//a",
            "true",
            "false",
            "boolean",
            "1getTest",
            "1124",
            "get##",
            "%$@"
        ]

        for (const value of samples) {
            // given
            const validations = { javascriptIdentifier: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.invalidJavascriptIdentifier]: true }] })
        }

    })


    it('does allows valid javascriptidentifiers', () => {

        const samples = [
            "getTest",
            "getTest23",
            "get_Test",
            "get_Test$",
        ]
        for (const value of samples) {
            // given
            const validations = { javascriptIdentifier: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
    })
})
