// Import the required modules
const fs = require("fs");
const path = require("path");
const buildDependencyGraph = require("./buildDependencyGraph");
const removePrefix = require("./removePrefix");
const cleanDependency = require("./cleanDependency");

// Define a function that retrieves the files in dependency order
function getFilesInDependencyOrder(
  rootFilePath,
  userImport,
  mainDirectoryPath
) {
  // Create a map to store the contents of each file
  const fileContentsMap = new Map();

  // Create a set to keep track of visited files
  const visitedFiles = new Set();

  // Create an array to store the dependency order
  const dependencyOrder = [];

  // Build the dependency graph
  const dependencyGraph = {};

  // Define a function to traverse the dependencies of a file
  function traverseDependencies(filePath) {
    // If the file has already been visited, return
    if (visitedFiles.has(filePath)) {
      return;
    }

    // Add the file to the visited set
    visitedFiles.add(filePath);

    // Read the file contents and add them to the file contents map
    const fileContents = fs.readFileSync(filePath, "utf-8");
    fileContentsMap.set(filePath, fileContents);

    // Build the dependency graph for the file
    const dependencies = buildDependencyGraph(
      filePath,
      fileContents,
      userImport,
      mainDirectoryPath
    );

    // Add the dependencies to the dependency graph
    dependencyGraph[filePath] = dependencies;

    // Add the dependency paths to the traversal queue
    const dependencyPaths = Object.values(dependencies);
    dependencyPaths.forEach((dependencyPath) => {
      dependencyPath.forEach((dp) => {
        if (!visitedFiles.has(dp)) {
          traverseQueue.push(dp);
        }
      });
    });
  }

  // Initialize the traversal queue with the root file path
  const traverseQueue = [rootFilePath];

  // Traverse the dependencies of each file in the queue
  while (traverseQueue.length > 0) {
    const filePath = traverseQueue.shift();
    let exactFilePath;
    const resolvedPath = require.resolve(filePath);
    exactFilePath = path.resolve(resolvedPath);
    traverseDependencies(exactFilePath);
  }

  // Perform topological sorting
  const visitedNodes = new Set();

  // Define a function to visit each node
  function visit(node) {
    // If the node has already been visited, return
    if (visitedNodes.has(node)) {
      return;
    }

    // Add the node to the visited set
    visitedNodes.add(node);

    // Recursively visit the dependencies of the node
    const dependencies = dependencyGraph[node] || [];
    Object.values(dependencies).forEach((dependency) => {
      visit(dependency);
    });
    // Add the node to the dependency order
    dependencyOrder.push(node);
  }

  // Add any remaining files to the dependency order
  dependencyOrder.push(...visitedFiles);
  visitedFiles.forEach((filePath) => {
    visit(filePath);
  });

  // Remove the prefixes from the dependency graph
  const cleanPrefixDependencyGraph = removePrefix(
    dependencyGraph,
    mainDirectoryPath
  );

  // Clean up the dependency graph
  const cleanDependencyGraph = cleanDependency(cleanPrefixDependencyGraph);
  return cleanDependencyGraph;
}

module.exports = getFilesInDependencyOrder;
