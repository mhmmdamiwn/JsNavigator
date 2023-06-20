
const fs = require('fs')
var Module = require('module');
var originalRequire = Module.prototype.require;
function JsNavigator(){
    
  
}
function addLogger(startFile){
  Module.prototype.require = function(arg){
    const resolvedPath = require.resolve(arg);
    const fileContent = fs.readFileSync(process.cwd()+'/Logs.txt', 'utf-8');
    fs.writeFileSync('./Logs.txt',fileContent+require.resolve(arg).replace(process.cwd(),'root')+'\n','utf-8')
    delete require.cache[startFile];
    delete require.cache[resolvedPath];
    return originalRequire.apply(this, arguments);
    };
}
module.exports = {addLogger,JsNavigator};