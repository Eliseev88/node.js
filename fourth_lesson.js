#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const yargs = require("yargs");

const options = yargs
	.usage("Usage: -s <string to find>")
	.option("s", { alias: "string", describe: "String to find", type: "string", demandOption: false })
	.argv;

let currentDirectory = process.cwd();

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
}

let list = fs.readdirSync(currentDirectory)

function reader () {
    inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: "Choose file:",
        choices: list,
      },
    ])
    .then((answer) => {
        const filePath = path.join(currentDirectory, answer.fileName);
        if (isFile(filePath)) {
            fs.readFile(filePath,'utf8', (err, data) => {
                console.log(options.string)
                let re = new RegExp(options.string + '(.+?)(\n|$)',"gm");
                console.log(data.match(re).toString());
            });
        } else {
            currentDirectory = filePath;
            list = fs.readdirSync(filePath)
            reader();
        }
    });
}

reader()