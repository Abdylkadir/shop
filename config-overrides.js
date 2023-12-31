const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@constants': 'src/constants',
    '@store': 'src/store',
  })(config);

  return config;
};