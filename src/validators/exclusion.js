const checker = require("../checker");
const err = require("../errorCodes");

function exclusion(value, options) {
  if (checker.isEmpty(value)) return null

  if (checker.isArray(options)) {
    options = {within: options};
  }

  const result = !checker.contains(options.within,value)
  return result ? null: { [err.invalidExclusion]: options.within }
}

module.exports = exclusion;
