
const fs = require('fs')
var Module = require('module');
var originalRequire = Module.prototype.require;
function JsNavigator(startFile){
   Module.prototype.require = function(arg){
    const resolvedPath = require.resolve(process.cwd()+'/'+arg);
    const fileContent = fs.readFileSync(process.cwd()+'/node_modules/js-navigator/Logs.txt', 'utf-8');
    fs.writeFileSync(process.cwd()+'/node_modules/js-navigator/Logs.txt',fileContent+require.resolve(process.cwd()+'/'+arg).replace(process.cwd(),'root')+'\n','utf-8')
    delete require.cache[startFile];
    delete require.cache[resolvedPath];
    return originalRequire.apply(this, arguments);
    };
   
}
module.exports = JsNavigator;