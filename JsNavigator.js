// Importing the necessary modules
const getFilesInDependencyOrder = require("./GetFileInDependencyOrder");
const FindHowUserImports = require("./FindHowUserImports");
const FindUserStartFile = require("./FindUserStartFile");
const readline = require('readline');
const showFileInBrowser = require("./showInBrowser");

// Creating an instance of readline to read input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An async function that orchestrates the entire JsNavigator process
async function JsNavigator() {
  // Getting user input for the files that need to be processed
  const userImport = await FindHowUserImports(rl);
  const userStartFile = await FindUserStartFile(rl);

  // Ordering the files based on their dependencies
  const dependencyOrder = getFilesInDependencyOrder(`${process.cwd()}/${userStartFile}`, userImport);

  // Displaying the ordered files in a browser
  await showFileInBrowser(dependencyOrder);

}
module.exports = JsNavigator;