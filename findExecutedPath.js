function findExecutedPath(lastExecutedFile,dependencyOrder){
    let executedPath = [lastExecutedFile]
    Object.entries(dependencyOrder).reverse().forEach(([key,value])=>{
        // console.log(value);
        if(value.includes(lastExecutedFile)){
            executedPath.push(key)
            lastExecutedFile = key
        }
    })
    return executedPath
}
module.exports = findExecutedPath