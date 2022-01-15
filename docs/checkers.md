# Checkers 

Checkers allow users to validate data with simple functions

### `isFunction`: validate the the value is a function

```javascript
const { checker } = require('@herbsjs/suma')

function sampleFunc () {}
const ret = checker.isFunction(sampleFunc)
console.log(ret)

/* Output: true */
```

### `isDefined`: validates if the value is different from null or undefined

```javascript
const { checker } = require('@herbsjs/suma')

const samples = [
    null,
    undefined,
    ''
]
for (const value of samples) {
    const ret = checker.isDefined(value)
    console.log(ret)    
}


/* Output: false, false, true */
```

### `isArray`: validates if the value is a array

```javascript
const { checker } = require('@herbsjs/suma')

const value = ['a', 'b', 'c']
const ret = checker.isArray(value)
console.log(ret)

/* Output: true */
```