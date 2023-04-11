/**
 * Removes any unnecessary keys from the dependency object.
 *
 * @param {Object} obj - The dependency object to be cleaned.
 * @returns {Object} The cleaned dependency object.
 */
function cleanDependency(obj) {
   let newObj = {};
   Object.keys(obj).map(key => {
      if (Object.values(obj[key])[0] !== undefined) {
         newObj[key] = Object.values(obj[key])[0];
      }
      else {
         newObj[key] = Object.values(obj[key]);
      }
   })
   return newObj;
}
module.exports = cleanDependency