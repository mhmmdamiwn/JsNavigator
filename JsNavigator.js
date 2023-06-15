
const fs = require('fs')
const { exec } = require('child_process');
function JsNavigator(startFile){
  try{

    let filePath = process.cwd()+`/${startFile}`;
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const modifiedContent = ` 
    var Module = require('module');
    var originalRequire = Module.prototype.require;
    const fs = require('fs')
    Module.prototype.require = function(arg){
    const fileContent = fs.readFileSync(process.cwd()+'/requireLogs.txt', 'utf-8');
    fs.writeFileSync('./requireLogs.txt',fileContent+arg+'\\n','utf-8')
    return originalRequire.apply(this, arguments);
    };\n
    \n${fileContent}`;

    fs.writeFileSync(filePath, modifiedContent, 'utf-8');
  }
  catch(err){
    console.log(err)
  }
exec(`node ${startFile}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
}
module.exports = JsNavigator;