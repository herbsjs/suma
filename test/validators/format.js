const assert = require("assert")
const { validate, errorCodes } = require("../../src/suma")
const err = errorCodes

describe("format validation", () => {
    it('does allow empty values', () => {

        //zipcode regex
        var pattern = /^[0-9]{8}$/
        
        const samples = [
            {},
            [],
            '',
            ' ',
            null,
            undefined
        ]
        for (const value of samples) {
            // given
            const validations = { format: pattern }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
    })

    it("allows values that matches the pattern", function() {

       //zipcode regex
       var pattern = /^[0-9]{8}$/
        
       const samples = [
          "05541030",37130000
       ]

       for (const value of samples) {
           // given
           const validations = { format: pattern }
           // when
           const ret = validate(value, validations)
           // then
           assert.deepStrictEqual(ret, { value: value, errors: [] })
       }

      })


      it("allows RegExp flag pattern", function() {

        //zipcode regex
        var pattern = new RegExp('^[0-9]{8}$','i')
         
        const samples = [
           "05541030",37130000
        ]
 
        for (const value of samples) {
            // given
            const validations = { format: pattern }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
 
       })


    it("allows work with multiple validations", function() {

        //zipcode regex
        var pattern = /^[0-9]{8}$/
         
        const samples = [
            "05541030",37130000
        ]
 
        for (const value of samples) {
            // given
            const validations = { format: pattern, presence: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
 
       })
      
    it('does not allow values that not matches the pattern', () => {

         //zipcode regex
         var pattern = /^[0-9]{8}$/
        
         const samples = [
            "fz055410",true,37130.000,['37130000']
         ]
        for (const value of samples) {
            // given
            const validations = { format: pattern  }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.invalidFormat]: true }] })
        }
    })   
})
