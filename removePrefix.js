function removePrefix(inputObject){
   const a =JSON.parse(JSON.stringify(inputObject).replaceAll(process.cwd(),'root'));
   return a;
}
module.exports = removePrefix;