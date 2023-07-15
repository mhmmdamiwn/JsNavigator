const logReader = require("./logReader");
const getFilesInDependencyOrder = require("./GetFileInDependencyOrder");
const findExecutedPath = require("./findExecutedPath");
const app = require("express")();
let dependencyOrder;
let mainDirectoryPath = process.cwd().split("/");
mainDirectoryPath.splice(-2, 2);
mainDirectoryPath = mainDirectoryPath.join("/");
app.get("/jsnavigator", (req, res) => {
  const queryParams = req.query;
  dependencyOrder = getFilesInDependencyOrder(
    `${queryParams.entry}`,
    // `${mainDirectoryPath}/${queryParams.entry}`,
    queryParams.importMethod,
    mainDirectoryPath
  );
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(dependencyOrder));
});

app.get("/jsnavigator/postman", (req, res) => {
  const lastExecutedFile = logReader("./Logs.txt", dependencyOrder);
  const executedPath = {
    executed: findExecutedPath(lastExecutedFile, dependencyOrder).reverse(),
  };
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify(executedPath));
});

app.listen(8585, (err) => {
  if (err) console.log(err);
  console.log("server listening on port 8585");
});
