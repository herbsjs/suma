const assert = require('assert')
const validate = require('../../src/suma')
const err = require('../../src/errorCodes')

describe('numericality validation', () => {

    it('does allows valid numeric values', () => {
        const samples = [
            [1, { equalTo: 1 }],
            [null, { equalTo: 1 }],
            [1, { greaterThan: 0 }],
            [null, { greaterThan: 0 }],
            [1, { greaterThanOrEqualTo: 1 }],
            [2, { greaterThanOrEqualTo: 1 }],
            [null, { greaterThanOrEqualTo: 1 }],
            [0, { lessThan: 1 }],
            [null, { lessThan: 1 }],
            [1, { lessThanOrEqualTo: 1 }],
            [0, { lessThanOrEqualTo: 1 }],
            [null, { lessThanOrEqualTo: 1 }],
            [10, { onlyInteger: true }],
            [1.1, { onlyInteger: false }],
            [null, { onlyInteger: false }],
        ]
        for (const value of samples) {
            const validations = { numericality: value[1] }
            const ret = validate(value[0], validations)
            assert.deepStrictEqual(ret, { value: value[0], errors: [] })
        }
    })

    it('does allows valid numeric values with multiple params', () => {
        const value = 123
        const numericality = {
            equalTo: 123,
            greaterThan: 0,
            greaterThanOrEqualTo: 123,
            lessThan: 200,
            lessThanOrEqualTo: 123,
            onlyInteger: true
        }
        const validations = { numericality }
        const ret = validate(value, validations)
        assert.deepStrictEqual(ret, { value: value, errors: [] })
    })

    it('does not allows invalid numeric values', () => {
        const samples = [
            [0, { equalTo: 1 }, err.notEqualTo],
            [0, { greaterThan: 1 }, err.notGreaterThan],
            [0, { greaterThanOrEqualTo: 1 }, err.notGreaterThanOrEqualTo],
            [1, { lessThan: 0 }, err.notLessThan],
            [1, { lessThanOrEqualTo: 0 }, err.notLessThanOrEqualTo],
            [1.1, { onlyInteger: true }, err.notAnInteger],
            ['a', { onlyInteger: true }, err.notAnInteger],
        ]
        for (const value of samples) {
            const validations = { numericality: value[1] }
            const ret = validate(value[0], validations)
            assert.deepStrictEqual(ret, {
                value: value[0],
                errors: [{ [value[2]]: value[1][Object.keys(value[1])[0]] }]
            })
        }
    })

    it('does not allows invalid numeric values with multiple params', () => {
        const value = 123.4
        const numericality = {
            equalTo: 123,
            greaterThan: 200,
            greaterThanOrEqualTo: 123,
            lessThan: 0,
            lessThanOrEqualTo: 123,
            onlyInteger: true
        }
        const validations = { numericality }
        const ret = validate(value, validations)
        assert.deepStrictEqual(ret, {
            value: value,
            errors: [
                { notEqualTo: 123 },
                { notGreaterThan: 200 },
                { notLessThan: 0 },
                { notLessThanOrEqualTo: 123 },
                { notAnInteger: true }
            ]
        })

    })
})