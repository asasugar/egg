'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515670646751_2540';

  // add your config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};