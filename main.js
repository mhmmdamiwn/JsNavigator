
const logReader = require("./logReader");
const getFilesInDependencyOrder = require("./GetFileInDependencyOrder");
const findExecutedPath = require('./findExecutedPath')
const app = require('express')()
let dependencyOrder;

app.get('/jsnavigator', (req, res) => {
  const queryParams = req.query;
  dependencyOrder = getFilesInDependencyOrder(`${process.cwd()}/${queryParams.entry}`, queryParams.importMethod);
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(dependencyOrder));
})

app.get('/jsnavigator/postman', (req, res) => {
  const lastExecutedFile = logReader("./Logs.txt", dependencyOrder)
  const executedPath = { "executed": findExecutedPath(lastExecutedFile, dependencyOrder).reverse() };
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(executedPath));
}
)

app.listen(8585, (err) => {
  if (err)
    console.log(err)
  console.log('server listening on port 8585')
})
