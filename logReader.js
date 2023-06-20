const fs = require('fs');

function logReader(filePath,dependencyOrder) {
    const allLogs = fs.readFileSync(filePath,'utf-8');
    let lastExecutedFile;
    allLogs.split("\n").reverse().some((el)=>{
        if(Object.keys(dependencyOrder).includes(el)){
            lastExecutedFile = el
            return true;
        }
    })
    return lastExecutedFile
}
module.exports = logReader;