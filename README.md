 <p align="center"><img src="https://raw.githubusercontent.com/herbsjs/suma/master/docs/logo.png" height="220"></p>  

![CI Build](https://github.com/herbsjs/suma/workflows/Node.js%20CI/badge.svg?branch=master) [![codecov](https://codecov.io/gh/herbsjs/suma/branch/master/graph/badge.svg)](https://codecov.io/gh/herbsjs/suma)

# Suma

Suma helps with single value validations.

Extensible, test covered and errors code only!

Suma does not validate schema or objects, just single values. For schema validation take a look at [`herbjs/gotu`](https://github.com/herbsjs/gotu).

### Installing
    $ npm install suma

### Using

```javascript
const { validate } = require('suma')

const value = null
const validations = { presence: true }
const result = validate(value, validations) 
/* {
    value: null,
    errors: [{ cantBeEmpty: true }]
} */
```

### Validators

#### Presence

`presence` (boolean) - Validates that the specified value is not empty.

```javascript
const value = ''
const validations = { presence: true }
const result = validate(value, validations) 
/* {
    value: '',
    errors: [{ cantBeEmpty: true }]
} */
```

#### Allow Null

`allowNull` (boolean) - Validates that the specified value is not `null` or `undefined`.

```javascript
const value = null
const validations = { allowNull: false }
const result = validate(value, validations) 
/* {
    value: null,
    errors: [{ cantBeNull: true }]
} */
```

#### Presence vs allowNull

|               | presence: true    | allowNull: false  | 
| ------------- | ------------------| ----------------  |
| 'Text'        |       Valid       |       Valid       | 
| 123           |       Valid       |       Valid       |
| 0             |       Valid       |       Valid       |
| ' '           |                   |       Valid       |
| ''            |                   |       Valid       |
| []            |                   |       Valid       |
| {}            |                   |       Valid       |
| null          |                   |                   |  
| undefined     |                   |                   |  



#### Contains

`contains` -  The contains validator is useful for validating allowance or restriction in certain values.
It checks that the given value exists in the target given by the **allowed** or  **notAllowed** option.

You can specify the validator as a list, string or as an object (in which case the keys of the object are used).

**allowed option examples:**

```javascript

const list = ["small", "medium", "large"]
const value = 'xlarge'
const options = { allowed: list }
const validations = { contains: options }
const result = validate(value, validations) 
/* {
    value: 'xlarge',
    errors: [{ notContains: ["small", "medium", "large"] }]
} */

const text = "lorem ipsum dolor"
const value = 'hello'
const options = { allowed: text }
const validations = { contains: options }
const result = validate(value, validations) 
/* {
    value: 'hello',
    errors: [{ notContains: "lorem ipsum dolor" }]
} */


const object = {type:"Fiat", model:"500", color:"white"}
const value = 'price'
const options = { allowed: object }
const validations = { contains: options }
const result = validate(value, validations) 
/* {
    value: 'price',
     errors: [{ notContains: {type:"Fiat", model:"500", color:"white"} }]
} */

```

**notAllowed option examples:**

```javascript

const list = ["small", "medium", "large"]
const value = 'small'
const options = { notAllowed: list }
const validations = { contains: list }
const result = validate(value, validations) 
/* {
    value: 'small',
    errors: [{ contains: ["small", "medium", "large"] }]
} */


const text = "hello world"
const value = 'hello'
const options = { notAllowed: text }
const validations = { contains: options }
const result = validate(value, validations) 
/* {
    value: 'hello',
    errors: [{ contains: "hello world" }]
} */


const object = {type:"Fiat", model:"500", color:"white"}
const value = 'type'
const options = { notAllowed: object }
const validations = { contains: options }
const result = validate(value, validations) 
/* {
    value: 'type',
     errors: [{ contains: {type:"Fiat", model:"500", color:"white"} }]
} */

```

**using both options examples:**

```javascript

const allowedList = ["small", "medium", "large"]
const notAllowedList = ["xlarge", "xxlarge", "tiny"]
const value = 'regular'
const options = { allowed:allowedList, notAllowed: notAllowedList }
const validations = { contains: options }
const result = validate(value, validations) 
/* {
    value: 'regular',
    errors: [{ notContains: ["small", "medium", "large"] }]
} */

const allowedList = ["small", "medium", "large"]
const notAllowedList = ["xlarge", "xxlarge", "tiny"]
const value = 'xlarge'
const options = { allowed:allowedList, notAllowed: notAllowedList }
const validations = { contains: list }
const result = validate(value, validations) 
/* {
    value: 'regular',
    errors: [
             { notContains: ["small", "medium", "large"] },
             { contains: ["xlarge", "xxlarge", "tiny"] }
            ]
} */


```

#### Length

Validates the length of the value. 

It is possible to specify length constraints in different ways:

`minimum` (number) - The value cannot have less than the specified length

`maximum` (number) - The value cannot have more than the specified length

`is` (number) - The value length must be equal to the given length

```javascript
const value = 'john'
const validations = { length: { minimum: 5, maximum: 3, is: 1 } }
const result = validate(value, validations) 
/* {
    value: 'john',
    errors: [
        { isTooShort: 5 },
        { isTooLong: 3 },
        { wrongLength: 1 }
    ]
} */
```

#### Numericality

Validates constraints to acceptable numeric values.

It must be a valid `Number` JS object. Use `{ type: Number }` to validate if the value is a valid JS `Number` object.

`equalTo` (number) - Specifies the value must be equal to the supplied value. 

`greaterThan` (number) - Specifies the value must be greater than the supplied value. 

`greaterThanOrEqualTo` (number) - Specifies the value must be greater than or equal to the supplied value.

`lessThan` (number) - Specifies the value must be less than the supplied value.

`lessThanOrEqualTo` (number) - Specifies the value must be less than or equal to the supplied value. 

`onlyInteger` (boolean) - To specify that only integral numbers are allowed.

```javascript
const value = 123.4
const validations = {
    numericality: {
        equalTo: 123,
        greaterThan: 200,
        greaterThanOrEqualTo: 123,
        lessThan: 0,
        lessThanOrEqualTo: 123,
        onlyInteger: true
    }
}
const result = validate(value, validations) 
/* {
    value: 123.4,
    errors: [
        { notEqualTo: 123 },
        { notGreaterThan: 200 },
        { notLessThan: 0 },
        { notLessThanOrEqualTo: 123 },
        { notAnInteger: true }
    ]
} */
```

#### Datetime

Validates constraints to acceptable date and time values.

It must be a valid `Date` time JS object. Use `{ type: Date }` to validate if the value is a valid JS `Date` object.

`before` (date) - A date must be before this value to be valid 

`after` (date) - A date must be after this value to be valid 

`isAt` (date) - A date must be equal to value to be valid 

```javascript
const value = new Date('2001-01-02')
const validations = {
    datetime : {
            before: new Date('2001-01-01'),
            after: new Date('2001-01-03'),
            isAt: new Date('2001-02-02')
        }
}
const result = validate(value, validations) 
/* {
    value: '2001-01-02T00:00:00.000Z',
    errors: [
        { tooLate: '2001-01-01T00:00:00.000Z' },
        { tooEarly: '2001-01-03T00:00:00.000Z') },
        { notAt: '2001-02-02T00:00:00.000Z') }
    ]
} */
```



#### Format

`format` (regex) -The format validator will validate a value against a regular expression of your chosing.

```javascript

const pattern = /^[0-9]{8}$/ // or you can use new RegExp('^[0-9]{8}$')
const value = '05547-022'
const validations = { format: pattern }
const result = validate(value, validations) 
/* {
    value: '05547-022',
    errors: [{ invalidFormat: true }]
} */


```



#### Type

Type validator ensures a value is of the correct JavaScript type or a custom type.

`type` - A valid native JavaScript type, a custom type or a array with type

Native JavaScript types:

`Number` - double-precision 64-bit binary format IEEE 754 value

`String` - a UTF‐16 character sequence

`Boolean` - true or false

`Date` - represents a single moment in time in a platform-independent format. 

`Object` - the Object class represents one of JavaScript's data types.

`Array` - the Array class is a object that is used in the construction of arrays. 

```javascript
const value = '2001'
const validations = { type: Date }
const result = validate(value, validations)
/* {
    value: '2001',
    errors:[{ wrongType: 'Date' }]
} */

```

Custom types:

```javascript

class User { ... }

const value = 'Admin'
const validations = { type: User }
const result = validate(value, validations)
/* {
    value: 'Admin',
    errors:[{ wrongType: 'User' }]
} */

```

Lists - Array with types:

It is possible to validate the type of elements of an array. Just use `[type]`.

```javascript
const value = ['2']
const validations = { type: [Number] }
const result = validate(value, validations)
/* {
    value: ['2'],
    errors:[{ wrongType: ['Number'] }]
} */
```


#### URL

 The URL validator ensures that the input is a valid URL. Validating URLs are pretty tricky but this validator is inspired on a gist that can be found [`here`](https://gist.github.com/dperini/729294). 

 The following options are supported: 

`schemes` - (array of string) A list of schemes to allow. If you want to support any scheme you can use a regexp here (for example **[".+"]**). The default value is **["http", "https"]**. 

`allowLocal` (boolean) - A boolean that if true allows local hostnames such as **10.0.1.1** or localhost. The default is **false**. 

`allowDataUrl` (boolean) - A boolean that if true allows data URLs as defined in [`RFC 2397`](https://tools.ietf.org/html/rfc2397). The default is **false**

```javascript
const value = "google.com"
const validations = { url: true }
const result = validate(value, validations) 
/* {
    value: 'google.com',
    errors: [{ invalidURL: true }]
} */

const value = "http://localhost"
const validations = { url: {allowLocal: true} }
const result = validate(value, validations) 
/* {
    value: 'http://localhost',
    errors: []
} */

const options = {schemes: ['ftp']}
const value = "ftp://google.com"
const validations = { url: options }
const result = validate(value, validations) 
/* {
    value: 'ftp://google.com',
    errors: []
} */
```

### Null Values

The `type`, `length`, `numericality`, `format` and `datetime` validators won't validate a value if it's `null` or `undefined`.

To ensure your your value is not null, use `allowNull: false` or `presence: true`.

## TODO

Validators:
- [X] presence / null
- [X] length 
- [X] type 
- [X] numericality (greater than, equal to, is integer, etc)
- [X] format - regex
- [X] date - earliest, latest
- [X] url
- [ ] common formats - email, etc
- [X] enums/lists - validate if value exists in the given list
- [X] reject list - validate if value does not exists in the given list 

Features:
- [X] Error message only
- [X] No dependency 
- [X] Doc every validators property
- [ ] Allow a custom functions for validaton
- [ ] Allow a conditional `if` functions for validaton
- [ ] Be able to inject a diferent `checker`
- [ ] Better checks on validator's `params`


### Contribute
Come with us to make an awesome *Suma*.

Now, if you do not have technical knowledge and also have intend to help us, do not feel shy, [click here](https://github.com/herbsjs/suma/issues) to open an issue and collaborate their ideas, the contribution may be a criticism or a compliment (why not?)

We have some conventions to contribute to the *Suma* project, see more information in our [CONTRIBUTING.md](CONTRIBUTING.md). So please, read this before send to us a [pull requests](https://github.com/herbsjs/suma/pulls).

### The Herb

Suma is often called Brazilian ginseng due to it’s ability to increase strength and stamina. Like all adaptogens, suma is good for reducing the ill effects of stress.

https://www.herbslist.net/

https://en.wikipedia.org/wiki/Pfaffia_glomerata

### License

**Suma** is released under the
[MIT license](https://github.com/herbsjs/suma/blob/development/LICENSE.md).