function custom(value, options) {
  const keys = Object.keys(options)
  let result = []

  for (const name of keys) {
    const isValid = options[name](value)
    if (!isValid) {
      result.push({
        [name]: true,
      })
    }
  }
  return result
}

module.exports = custom
