const checker = require("../checker");
const err = require("../errorCodes");

function format(value, expression) {
  let results = null
  if (checker.isEmpty(value)) {
    return null;
  }

  const result = expression.test(value);
  if (result === false || !checker.isString(value))
  {
      results = results || []
      results.push({ [err.invalidFormat]: true })
  }

  return results;
}

module.exports = format;
