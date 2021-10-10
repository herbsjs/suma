const assert = require('assert')
const checker = require('../../src/checker')

describe('iterable checker', () => {

    it('check for a iterable value', () => {
        const samples = [
            [{ name: 'jhon', age: 35},{ name: 'marie', age: 29}],
            ["a", "b", "c"]
        ]
        for (const value of samples) {
            const ret = checker.isIterable(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a iterable value', () => {
        const samples = [
            null,
            { name: 'jhon', age: 35}
        ]
        for (const value of samples) {
            const ret = checker.isIterable(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
