<p align="center"><img src="" height="220"></p>

# Suma

Suma helps with single value validations emiting error codes only

### Installing
    $ npm install suma

### Using

```javascript
const value = null
const validations = { presence: true }
const result = validate(value, validations) 
/* {
    value: null,
    errors: [
        { error: 'CANT_BE_EMPTY', values: null }
    ]
} */
```

### Validators

#### Presence

```javascript
const value = ''
const validations = { presence: true }
const result = validate(value, validations) 
/* {
    value: '',
    errors: [
        { error: 'CANT_BE_EMPTY', values: null }
    ]
} */
```

#### Allow Null

```javascript
const value = null
const validations = { allowNull: false }
const result = validate(value, validations) 
/* {
    value: null,
    errors: [
        { error: 'CANT_BE_NULL', values: null }
    ]
} */
```

#### Presence vs allowNull

|               | presence: true    | allowNull: false  | 
| ------------- | ------------------| ----------------  |
| 'Text'        |         Ok        |         Ok        | 
| 123           |         OK        |         Ok        |
| 0             |         OK        |         Ok        |
| ' '           |                   |         Ok        |
| ''            |                   |         Ok        |
| []            |                   |         Ok        |
| {}            |                   |         Ok        |
| null          |                   |                   |  
| undefined     |                   |                   |  

#### Length

```javascript
const value = 'john'
const validations = { length: { minimum: 5, maximum: 3, is: 1 } }
const result = validate(value, validations) 
/* {
    value: 'john',
    errors: [
        { error: 'IS_TOO_SHORT', values: { length: 5 } },
        { error: 'IS_TOO_LONG', values: { length: 3 } },
        { error: 'WRONG_LENGTH', values: { length: 1 } }
    ]
} */
```

#### Numericality

```javascript
const value = 123.4
const validations = {
    equalTo: 123,
    greaterThan: 200,
    greaterThanOrEqualTo: 123,
    lessThan: 0,
    lessThanOrEqualTo: 123,
    onlyInteger: true
}
const result = validate(value, validations) 
/* {
    value: 'john',
    errors: [
        { notEqualTo: 123 },
        { notGreaterThan: 200 },
        { notLessThan: 0 },
        { notLessThanOrEqualTo: 123 },
        { notAnInteger: true }
    ]
} */
```

#### Type

Type validator ensures a value is of the correct JavaScript type:

`Number`: double-precision 64-bit binary format IEEE 754 value

`String`: a UTF‐16 character sequence

`Boolean`: true or false

`Date`: represents a single moment in time in a platform-independent format. 

`Object`: the Object class represents one of JavaScript's data types.

`Array`: the Array class is a object that is used in the construction of arrays. 

```javascript
const value = '2001'
const validations = { type: Date }
const result = validate(value, validations)
/* {
    value: '2001',
    errors: [
        { error: 'WRONG_TYPE', values: { type: 'Date' } }
    ]
} */

```

### Null Values

The `length` and `numericality` validators won't validate a value if it's `null`.
To ensure your your value is not null, use `allowNull:false`.

## TODO

Validators:
- [X] presence / null
- [X] length 
- [X] type 
- [X] numericality (greater than, equal to, is integer, etc)
- [ ] format - regex
- [ ] date - earliest, latest
- [ ] common formats - url, email, etc
- [ ] enums/lists - validate if value exists in the given list
- [ ] reject list - validate if value does not exists in the given list 

Features:
- [X] Error message only
- [X] No dependency 
- [ ] Doc every validators property
- [ ] Allow a custom functions for validaton
- [ ] Allow a conditional `if` functions for validaton
- [ ] Be able to inject a diferent `checker`


### Contribute
Come with us to make an awesome *Suma*.

Now, if you do not have technical knowledge and also have intend to help us, do not feel shy, [click here](https://github.com/dalssoft/suma/issues) to open an issue and collaborate their ideas, the contribution may be a criticism or a compliment (why not?)

We have some conventions to contribute to the *Suma* project, see more information in our [CONTRIBUTING.md](CONTRIBUTING.md). So please, read this before send to us a [pull requests](https://github.com/dalssoft/suma/pulls).

### The Herb

Suma is often called Brazilian ginseng due to it’s ability to increase strength and stamina. Like all adaptogens, suma is good for reducing the ill effects of stress.

https://www.herbslist.net/

https://en.wikipedia.org/wiki/Centella_asiatica

### License

**Suma** is released under the
[MIT license](https://github.com/dalssoft/suma/blob/development/LICENSE.md).