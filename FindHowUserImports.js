const chalk = require("chalk");
function FindHowUserImports(rl) {
  return new Promise((resolve, reject) => {
    // Prompt the user for their programming language
    const askForImportMethod = () => {
    rl.question(chalk.bold('How you import files in your repository? (Choose from: require, import) '), async (userImport) => {

      // Prompt the user for their preferred method of importing files based on their programming language
      userImport.trim();
      if (userImport === 'require') {
        resolve(userImport);
      } else if (userImport === 'import') {
        resolve(userImport);
      } else {
        console.log(`Sorry, ${userImport} is not a supported import method.`);
        askForImportMethod();
      }

    });
  }
  askForImportMethod();
  })

}
module.exports = FindHowUserImports;