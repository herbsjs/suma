const checker = require("../checker");
const err = require("../errorCodes");

function inclusion(value, options) {
  if (checker.isEmpty(value)) return null

  if (checker.isArray(options)) {
    options = {within: options};
  }

  const result = checker.contains(options.within,value)
  return result ? null: { [err.invalidInclusion]: options.within }
}

module.exports = inclusion;
