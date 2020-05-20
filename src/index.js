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



exit(0);
