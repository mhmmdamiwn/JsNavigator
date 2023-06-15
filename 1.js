 
    var Module = require('module');
    var originalRequire = Module.prototype.require;
    const fs = require('fs')
    Module.prototype.require = function(arg){
    const fileContent = fs.readFileSync(process.cwd()+'/requireLogs.txt', 'utf-8');
    fs.writeFileSync('./requireLogs.txt',fileContent+arg+'\n','utf-8')
    return originalRequire.apply(this, arguments);
    };

    

import * from './3'