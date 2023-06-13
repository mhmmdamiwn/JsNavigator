const http = require("http");
const JsNavigator = require("./JsNavigator");
const getFilesInDependencyOrder = require("./GetFileInDependencyOrder");
const { URL } = require("url");
const querystring = require("querystring");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const server = http.createServer((request, response) => {
  const { method, url } = request;
  const parsedUrl = new URL(url, `http://${request.headers.host}`);
  const queryParams = querystring.parse(parsedUrl.searchParams.toString());

  if (queryParams) JsNavigator(queryParams.entry);
  const dependencyOrder = getFilesInDependencyOrder(
    `${process.cwd()}/${queryParams.entry}`,
    queryParams.entry
  );
  console.log(dependencyOrder);
  if (method === "GET" && parsedUrl.pathname === "/jsnavigator") {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:5174"); // Allow requests from http://localhost:5174
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Content-Type", "application/json"); // Update content type to application/json

    response.writeHead(200);
    response.end(JSON.stringify(dependencyOrder));
  } else {
    // Handle other routes
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not Found");
  }
});

const port = 8585;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
