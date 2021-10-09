const toCapitalCase = (text) => {
  return text.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
};

const toUpperCase = (text) => {
  return text.toUpperCase();
};

export {
  toCapitalCase,
  toUpperCase
};
