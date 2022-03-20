const inArray = (key, array) => {
  return array.includes(key);
};
const existInArray = (value, array) => {
  const exists = array.indexOf(value);
  if (exists !== -1) {
    return true;
  } else {
    return false;
  }
};

export {
  inArray,
  existInArray
};
