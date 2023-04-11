// Importing the 'open' and 'fs' modules
const open = require('open');
const fs = require("fs");

// A function that takes an input object and generates an HTML file displaying its contents
async function showInBrowser(inputObject) {
   // Reading the contents of a file named 'htmlFileTxt.txt' and storing them in a variable
   let htmlTxt = fs.readFileSync(`${__dirname}/htmlFileTxt.txt`);
   // Replacing the '###JSON_OBJECT###' placeholder in the file with the input object
   let finalHtmlTxt = htmlTxt.toString().replace('###JSON_OBJECT###', JSON.stringify(inputObject));
   // Writing the final HTML file to disk
   fs.writeFileSync(process.cwd() + '/showFiles.html', finalHtmlTxt);
   // Opening the generated HTML file in the default browser
   open(process.cwd() + "/showFiles.html");
}

// Exporting the 'showInBrowser' function
module.exports = showInBrowser;
