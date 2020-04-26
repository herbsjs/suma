const assert = require("assert")
const { validate, errorCodes } = require("../../src/suma")
const err = errorCodes

describe("url validation", () => {
    it('does allow empty values', () => {

        const samples = [
            {},
            null,
            '',
            undefined
        ]
        for (const value of samples) {
            // given
            const validations = { url: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [] })
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
            const validations = { url: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors:  [{ [err.invalidURL]: true }] })
        }

    })


    it("does not allow 'invalid' urls", function () {

        const samples = [
            "http://",
            "http://.",
            "http://..",
            "http://../",
            "http://?",
            "http://##/",
            "http://#",
            "http://##",
            "http://foo.bar?q=Spaces should be encoded",
            "//",
            "//a",
            "///a",
            "http:///a",
            "foo.com",
            "rdar://1234",
            "h://test",
            "http:// shouldfail.com",
            ":// should fail",
            "http://foo.bar/foo(bar)baz quux",
            "ftps://foo.bar/",
            "http://-error-.invalid/",
            "http://-a.b.co",
            "http://10.1.1.0",
            "http://224.1.1.1",
            "http://3628126748",
            "http://.www.foo.bar/",
            "http://www.foo.bar./",
            "http://.www.foo.bar./",
            "http://10.1.1.1",
            "http://localhost"
        ]

        for (const value of samples) {
            // given
            const validations = { url: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.invalidURL]: true }] })
        }

    })


    it('does allows valid urls', () => {

        const samples = [
            "http://foo.com",
            "http://foo.com/",
            "http://foo.com/blah_blah",
            "http://foo.com/blah_blah/",
            "http://foo.com",
            "http://userid@example.com",
            "http://userid@example.com:8080",
            "http://userid:password@example.com",
            "http://foo.com/blah_(wikipedia)#cite-1",
            "http://foo.bar/?q=Test%20URL-encoded%20stuff",
            "http://उदाहरण.परीक्षा",
            "http://مثال.إختبار",
            "http://a.b-c.de",
            "http://223.255.255.254",
        ]
        for (const value of samples) {
            // given
            const validations = { url: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors:  [] })
        }
    })


    it('does allows valid local url and private networks if option is set ', () => {

        const samples = [
            "http://10.1.1.1",
            "http://172.16.1.123",
            "http://localhost/foo",
            "http://servername01:8153/go/cctray.xml"
        ]
        for (const value of samples) {
            // given
            const validations = { url: {allowLocal: true} }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors:  [] })
        }
    })

    it('does not allows valid local url and private networks if option is not set ', () => {

        const samples = [
            "http://10.1.1.1",
            "http://172.16.1.123",
            "http://localhost/foo",
            "http://servername01:8153/go/cctray.xml"
        ]
        for (const value of samples) {
            // given
            const validations = { url: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.invalidURL]: true }] })
        }
    })

    it('does allows data urls if option is set ', () => {

        const samples = [
            "data:,Hello%2C%20World!",
            "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D",
            "data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E",
        ]
        for (const value of samples) {
            // given
            const validations = { url: {allowDataUrl: true} }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors:  [] })
        }
    })

    it('does not allows data url if option is not set ', () => {

        const samples = [
            "data:,Hello%2C%20World!",
            "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D",
            "data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E",
        ]
        for (const value of samples) {
            // given
            const validations = { url: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.invalidURL]: true }] })
        }
    })


    it('does allows custom schemes if option is set ', () => {

        var options = {schemes: ['ftp','jdbc', '.+']}

        const samples = [
            "ftp://foo.bar.com",
            "jdbc://foo.bar.com",
            "sftp://foo.bar.com"
        ]
        for (const value of samples) {
            // given
            const validations = { url: options }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors:  [] })
        }
    })

    it('does not allows custom schemes if option is not set ', () => {

        const samples = [
            "ftp://foo.bar.com",
            "jdbc://foo.bar.com"
        ]
        for (const value of samples) {
            // given
            const validations = { url: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.invalidURL]: true }] })
        }
    })
})
