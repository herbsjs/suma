const assert = require('assert')
const checker = require('../../src/checker')

describe('contains checker', () => {

    it('check for a value that contains in array or string or object', () => {
        const samples = 
        [
            [["small", "medium", "large"],"large"],
            ["hello world","hello"],
            [[25,5,4],4],
            [{foo:true},"foo"]
        ]
        for (const value of samples) {
            const ret = checker.contains(value[0], value[1])
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for a value that not contains in array or string or object', () => {
        const samples = [
            [["small", "medium", "large"],"xlarge"],
            ["hello world","goodbye"],
            ["hello world", undefined],
            [undefined, "hello world"],
            [null,null],
            [[25,5,4],14],
            [{foo:true},"bar"],
            [256,6]
        ]
        for (const value of samples) {
            const ret = checker.contains(value[0], value[1])
            assert.deepStrictEqual(ret, false)
        }
    })
})
