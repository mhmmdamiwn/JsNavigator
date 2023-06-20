
const logReader = require("./logReader");
const getFilesInDependencyOrder = require("./GetFileInDependencyOrder");
const findExecutedPath = require('./findExecutedPath')
const app = require('express')()


  let dependencyOrder;

app.get('/jsnavigator',(req,res)=>{
    const queryParams = req.query;
   dependencyOrder = getFilesInDependencyOrder(`${process.cwd()}/${queryParams.entry}`,queryParams.importMethod);
  console.log(dependencyOrder);
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Content-Type", "application/json"); 
  res.writeHead(200);
    res.end(JSON.stringify(dependencyOrder));
  
})

app.get('/jsnavigator/postman',(req,res)=>{
  const lastExecutedFile = logReader("./Logs.txt",dependencyOrder)
  const executedPath = findExecutedPath(lastExecutedFile,dependencyOrder);
    res.send(JSON.stringify(executedPath));
  }
)

  app.listen(8585,(err)=>{
    if(err)
    console.log(err)
    console.log('server listening on port 8585')
  })
