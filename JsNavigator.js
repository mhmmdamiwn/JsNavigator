
const fs = require('fs')
var Module = require('module');
const path = require('path')
var originalRequire = Module.prototype.require;
function JsNavigator(startFile){
   Module.prototype.require = function(arg){
    
    if(path.isAbsolute(arg) || arg.includes('.') || arg.includes('/')){
        const resolvedPath = require.resolve(path.resolve(arg));
        const fileContent = fs.readFileSync(process.cwd()+'/node_modules/js-navigator/Logs.txt', 'utf-8');
        fs.writeFileSync(process.cwd()+'/node_modules/js-navigator/Logs.txt',fileContent+require.resolve(path.resolve(arg)).replace(process.cwd(),'root')+'\n','utf-8')
        delete require.cache[startFile];
        delete require.cache[resolvedPath];
    }
    return originalRequire.apply(this, arguments);
    };
   
}
module.exports = JsNavigator;