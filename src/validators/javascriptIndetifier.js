const checker = require("../checker")
const err = require("../errorCodes")

function javascriptIndentifier(value) {
  if (checker.isEmpty(value)) return { [err.cantBeEmpty]: true }

  const result = checker.isValidJavascriptIdentifier(value)
  return result ? null: { [err.invalidJavascriptIdentifier]: true }
}

module.exports = javascriptIndentifier
