/**
 * Build a dependency graph for a given file based on its contents and user's preferred import method
 * @param {string} filePath - the path of the file to build a dependency graph for
 * @param {string} fileContents - the contents of the file
 * @param {string} userImport - the user's preferred method of importing files
 * @returns {object} - a dependency graph for the given file
 */
const path = require('path');
function buildDependencyGraph(filePath, fileContents, userImport) {
  const dependencyGraph = {};
  let requireRegex;

  // Set the regular expression to use based on the userImport parameter
  if (userImport === 'require') {
    requireRegex = /require\((['"])([^@'"\/]+[^'"]+)\1\)/g;
  }
  else {
    requireRegex = /import .+ from (["'])([^'"]*[^'"]+)\1/g;
  }
  let match;
  // Loop through each match found by the regular expression and add its dependency path to the graph
  while ((match = requireRegex.exec(fileContents)) !== null) {
    const dependencyPath = path.resolve(path.dirname(filePath), match[2]);

    // If the current file doesn't exist in the graph, add it
    if (!dependencyGraph[filePath]) {
      dependencyGraph[filePath] = [];
    }

    // If the dependency path isn't already in the array for the current file, add it
    if (!dependencyGraph[filePath].includes(dependencyPath)) {
      let exactFilePath;

      // If the dependency path is relative, resolve it relative to the current file's path
      if (match[2].startsWith(".")) {
        const resolvedPath = require.resolve(dependencyPath);
        exactFilePath = path.resolve(resolvedPath);
      } 

      // If the dependency path is absolute, resolve it relative to the current working directory
      else {
        const resolvedPath1 = `${process.cwd()}/` + match[2];
        let resolvedPath;
        try {
          resolvedPath = require.resolve(resolvedPath1);
        }
        catch (ex) {
          continue;// If the dependency can't be resolved, skip it
        }
        exactFilePath = path.resolve(resolvedPath);
      }
      dependencyGraph[filePath].push(exactFilePath);
    }
  }


  return dependencyGraph;
}
module.exports = buildDependencyGraph;