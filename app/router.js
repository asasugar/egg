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
  // user用户表
  router.post('/api/login', controller.home.login);
  router.post('/api/editPassword', controller.home.editPassword);
  router.post('/api/reg', controller.home.reg);
  router.get('/api/addUser', controller.home.addUser);
  // product产品参数表
  router.get('/api/product', controller.home.product);
  // userMessage用户信息表
  router.post('/api/userMessage', controller.home.userMessage)
};