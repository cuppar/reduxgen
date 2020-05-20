const fs = require("fs");
const path = require("path");
const decamelize = require("./utils/decamelize").decamelize;
const decamelizeArray = require("./utils/decamelize").decamelizeArray;

module.exports = function gen(filenameWithoutExt, callback) {
  let fileList = [];
  let fileNameList = [];

  fileNameList.push({
    type: "reducer",
    filename: path.resolve(__dirname, `./templates/redux/reducer.js`)
  });

  let constants_placeholder;
  let mock_entity_placeholder;
  let file_name_placeholder;
  let method_placeholder;
  let entity_placeholder;
  let placeholderObj = {};

  constants_placeholder = decamelize(filenameWithoutExt, {
    separator: "_",
    caseSensitive: "upper"
  });
  placeholderObj["<constants_placeholder>"] = constants_placeholder;
  console.log("constants_placeholder :>> ", constants_placeholder);
  mock_entity_placeholder = decamelizeArray(filenameWithoutExt).map(word => {
    if (word.length > 0) {
      return `${word[0].toUpperCase()}${word.slice(1)}`;
    }
    return word;
  });
  mock_entity_placeholder.unshift("mock");
  mock_entity_placeholder = mock_entity_placeholder.join("");
  console.log("mock_entity_placeholder :>> ", mock_entity_placeholder);
  placeholderObj["<mock_entity_placeholder>"] = mock_entity_placeholder;

  try {
    fileNameList.forEach(file =>
      fileList.push({
        type: file.type,
        content: fs.readFileSync(file.filename)
      })
    );

    fileList = fileList.map(file => {
      for (const [key, value] of Object.entries(placeholderObj)) {
        file.content = file.content.toString().replace(RegExp(key, "g"), value);
        console.log("file.type :>> ", file.type);
        console.log("file.content :>> ", file.content);
      }
      return file;
    });

    callback(null, fileList);
  } catch (error) {
    callback(error);
  }
};
