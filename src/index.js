#!/usr/bin/env node
require("shelljs/global");
const argv = require("yargs")
  .usage(
    `Usage: reduxgen <business-object>
       reduxgen product`
  )
  .help("h")
  .alias("h", "help").argv;
const gen = require(`./gen.js`);
const path = require("path");
const fs = require("fs");

if (argv._.length <= 0) {
  console.log(`<business-object> param is required, exit.\n`);
  console.log(`Usage: reduxgen <business-object>
  reduxgen product`);
  exit(1);
}

const BO_NAME = argv._[0].toLowerCase();
const ROOT_DIR_NAME = `reduxgen-${BO_NAME}`;

if (fs.existsSync(ROOT_DIR_NAME)) {
  console.log(`Dir ${ROOT_DIR_NAME} has exist, exit.`);
  // exit(1);
}

const normalTemplateFileNameList = [
  path.resolve(__dirname, `./templates/redux/constants.js`),
  path.resolve(__dirname, `./templates/redux/state.js`),
  path.resolve(__dirname, `./templates/redux/reducer.js`),
  path.resolve(__dirname, `./templates/redux/actions.js`)
];

const actionTemplateFileNameList = [
  path.resolve(__dirname, `./templates/actionRedux/constants.js`),
  path.resolve(__dirname, `./templates/actionRedux/state.js`),
  path.resolve(__dirname, `./templates/actionRedux/reducer.js`),
  path.resolve(__dirname, `./templates/actionRedux/actions.js`)
];

let templateFileNameList = normalTemplateFileNameList;

const BO_NAME_UPPER_FIRST = `${BO_NAME[0].toUpperCase()}${BO_NAME.slice(
  1
).toLowerCase()}`;

let reduxActionList = [
  {
    type: "normal",
    name: `get${BO_NAME_UPPER_FIRST}List`
  },
  {
    type: "normal",
    name: `get${BO_NAME_UPPER_FIRST}`
  },
  {
    type: "action",
    name: `post${BO_NAME_UPPER_FIRST}`
  },
  {
    type: "action",
    name: `put${BO_NAME_UPPER_FIRST}`
  },
  {
    type: "action",
    name: `delete${BO_NAME_UPPER_FIRST}`
  }
];

mkdir(ROOT_DIR_NAME);
cd(ROOT_DIR_NAME);

try {
  for (const reduxAction of reduxActionList) {
    if (reduxAction.type === "normal") {
      templateFileNameList = normalTemplateFileNameList;
    } else if (reduxAction.type === "action") {
      templateFileNameList = actionTemplateFileNameList;
    } else {
      console.log("error: redux action type is not valid.");
      exit(1);
    }

    templateFileNameList = templateFileNameList.map(path => ({
      fileName: path.split("/").slice(-1)[0],
      path
    }));

    const fileList = gen(reduxAction.name, templateFileNameList);
    mkdir(reduxAction.name);
    cd(reduxAction.name);
    fileList.forEach(fileObj => {
      fs.writeFileSync(fileObj.fileName, fileObj.content);
    });
    cd("../");
  }

  console.log(`Done.`);
  console.log(`Please check ./${ROOT_DIR_NAME} dir.`);
  exit(0);
} catch (error) {
  console.log("error :>> ", error);
  exit(1);
}
