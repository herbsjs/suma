const assert = require('assert')
const checker = require('../../src/checker')

describe('regex checker', () => {

    it('check for a regex value', () => {
        const samples = [
            new RegExp('^[0-9]{8}$'),
            /^[0-9]{8}$/,
        ]
        for (const value of samples) {
            const ret = checker.isRegExp(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a regex value', () => {
        const samples = [
            null,
            undefined,
            1,
            "regex"
        ]
        for (const value of samples) {
            const ret = checker.isRegExp(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
