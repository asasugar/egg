'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.home.index);
  router.get('/api/addUser', controller.home.addUser);
  router.get('/api/product', controller.home.product)
  router.post('/api/login', controller.home.login);
};