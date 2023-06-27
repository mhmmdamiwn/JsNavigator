function removePrefix(inputObject,mainDirectoryPath){
   const a =JSON.parse(JSON.stringify(inputObject).replaceAll(mainDirectoryPath,'root'));
   return a;
}
module.exports = removePrefix;