const chalk = require("chalk");
function FindUserStartFile(rl) {
  return new Promise((resolve, reject) => {
    // Prompt the user for their name of a starting file
    rl.question(chalk.white.bold(`What is the name of your starting file that you want to cast?`) + chalk.white.bgBlue(`
      (if the starting file is in the root of your project just type the name of the file for example "app.js"    
      and if its not located in the root of your project type the path of the starting file for example           
      if it is located in the folder called "newFolder" type "newFolder/app.js" . note that the path will add to  
      the root of your project and if you dont enter the path properly this program will not ba able to perform)  \n`) + chalk.white.bold(`->`), async (userStartFile) => {
      userStartFile.trim();
      resolve(userStartFile);
    });
  })

}
module.exports = FindUserStartFile;