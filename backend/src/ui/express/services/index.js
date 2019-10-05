const { initPassport } = require('./passport');

const initServices = () => {
  initPassport();
};

module.exports = {
  initServices,
};
