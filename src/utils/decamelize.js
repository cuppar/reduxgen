const decamelize = (string, options) => {
  options = options || {};
  let separator = options.separator || "_";
  let split = options.split || /(?=[A-Z])/;
  let caseSensitive = options.caseSensitive || "lower";

  let result = string.split(split).join(separator);
  if (caseSensitive === "upper") {
    result = result.toUpperCase();
  } else {
    result = result.toLowerCase();
  }
  return result;
};

const decamelizeArray = (string, options) => {
  options = options || {};
  let split = options.split || /(?=[A-Z])/;

  let result = string.split(split);
  return result;
};

module.exports.decamelize = decamelize;
module.exports.decamelizeArray = decamelizeArray;