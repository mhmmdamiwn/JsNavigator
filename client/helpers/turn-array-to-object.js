export const turnArrayToObject = (array, key, value) => {
  const object = {};

  for (let i = 0; i < array.length; i++) {
    object[array[i][key]] = array[i][value];
  }

  return object;
};
