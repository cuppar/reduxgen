#!/usr/bin/env node
require("shelljs/global");
const argv = require("yargs")
  .option("a", {
    alias: "action",
    demand: true,
    default: false,
    boolean: true
  })
  .help("h")
  .alias("h", "help").argv;
const gen = require(`./gen.js`);
const genAction = require(`./genAction.js`);

if (argv.a) {
  genAction(argv._[0], (err, data) => {
    if (err) {
      console.log("err :>> ", err);
      exit(1);
    }
    console.log("data :>> ", data.toString());
    exit(0);
  });
} else {
  gen(argv._[0], (err, fileList) => {
    if (err) {
      console.log("err :>> ", err);
      exit(1);
    }
    console.log("fileList[0] :>> ", fileList[0].content.toString());
    exit(0);
  });
}
