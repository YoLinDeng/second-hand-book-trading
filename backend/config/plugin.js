'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // static: {
  //   enable: true,
  //   package: 'egg-static',
  // },
  // redis: {
  //   enable: true,
  //   package: 'egg-redis',
  // },
};
