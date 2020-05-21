const fs = require("fs");
const decamelize = require("./utils/decamelize").decamelize;
const decamelizeArray = require("./utils/decamelize").decamelizeArray;

module.exports = function gen(reduxActionName, templateFileNameList) {
  let fileList = [];
  const placeholderSplitLeft = "<";
  const placeholderSplitRight = ">";

  let constants_placeholder;
  let mock_entity_placeholder;
  let file_name_placeholder;
  let method_placeholder;
  let entity_placeholder;
  let camel_case_file_name_placeholder;

  let placeholderObj = {
    constants_placeholder: "",
    mock_entity_placeholder: "",
    file_name_placeholder: "",
    method_placeholder: "",
    entity_placeholder: "",
    camel_case_file_name_placeholder: ""
  };

  // init placeholder
  {
    constants_placeholder = decamelize(reduxActionName, {
      separator: "_",
      caseSensitive: "upper"
    });
    placeholderObj.constants_placeholder = constants_placeholder;

    mock_entity_placeholder = decamelizeArray(reduxActionName).map(word => {
      if (word.length > 0) {
        return `${word[0].toUpperCase()}${word.slice(1)}`;
      }
      return word;
    });
    mock_entity_placeholder.unshift("mock");
    mock_entity_placeholder = mock_entity_placeholder.join("");
    placeholderObj.mock_entity_placeholder = mock_entity_placeholder;

    file_name_placeholder = reduxActionName;
    placeholderObj.file_name_placeholder = file_name_placeholder;

    method_placeholder = decamelizeArray(reduxActionName)[0].toLowerCase();
    placeholderObj.method_placeholder = method_placeholder;

    entity_placeholder = decamelizeArray(reduxActionName)
      .slice(1)
      .join("");
    entity_placeholder = `${entity_placeholder[0].toLowerCase()}${entity_placeholder.slice(
      1
    )}`;
    placeholderObj.entity_placeholder = entity_placeholder;

    camel_case_file_name_placeholder = decamelizeArray(reduxActionName)
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join("");
    placeholderObj.camel_case_file_name_placeholder = camel_case_file_name_placeholder;
  }

  try {
    templateFileNameList.forEach(file =>
      fileList.push({
        fileName: file.fileName,
        content: fs.readFileSync(file.path).toString()
      })
    );

    fileList = fileList.map(file => {
      for (const [key, value] of Object.entries(placeholderObj)) {
        file.content = file.content.replace(
          RegExp(`${placeholderSplitLeft}${key}${placeholderSplitRight}`, "g"),
          value
        );
      }
      return file;
    });

    return fileList;
  } catch (error) {
    throw error;
  }
};
