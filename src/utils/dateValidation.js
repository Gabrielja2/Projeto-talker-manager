const validationDate = (date) => {
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return dateRegex.test(date);
};

module.exports = {
  validationDate,
};
