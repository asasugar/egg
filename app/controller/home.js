'use strict';
const {
  UserModel,
  ProductModel,
  UserMessageModel
} = require('../model/index')
const Controller = require('egg').Controller;
var md5 = require('md5');
const util = require('../function/util');
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async addUser() {
    const {
      ctx
    } = this;
    const {
      accout,
      password
    } = ctx.query;
    const UserEntity = new UserModel({
      accout,
      password
    });
    await UserEntity.save(function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        ctx.body = util.successRes({
          msg: '保存成功',
          data: ctx.query
        })
      }
    });
  }
  async login() {
    const {
      ctx
    } = this;
    const {
      accout,
      password
    } = ctx.query;
    await UserModel.findOne(ctx.request.body, function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        console.log(doc)
        if (doc) {
          ctx.body = util.successRes({
            msg: '登录成功',
            data: {
              token: doc.token
            }
          })
        } else {
          ctx.body = util.failRes({
            msg: '登录失败',
            data: ctx.request.body
          })
        }
      }
    });
  }
  async product() {
    const {
      ctx
    } = this;
    await ProductModel.findOne(function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        console.log(doc)
        ctx.body = util.successRes({
          msg: '查询成功',
          data: doc
        })
      }
    });
  }
  async userMessage() {
    const {
      ctx
    } = this;
    const {
      token
    } = ctx.query;
    await UserMessageModel.findOne(ctx.request.body, function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        console.log(doc)
        ctx.body = util.successRes({
          msg: '查询成功',
          data: {
            userName: doc.userName,
            company: doc.company
          }
        })
      }
    });
  }
  async editPassword() {
    const {
      ctx
    } = this;
    const {
      accout,
      oldPassword,
      newPassword
    } = ctx.query;
    console.log(ctx.request.body)
    await UserModel.findOne({
      accout: ctx.request.body.accout,
      password: ctx.request.body.oldPassword
    }, function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        if (doc) {
          UserModel.update({}, {
            password: ctx.request.body.newPassword
          }, function (error) {
            if (error) {
              console.log(error);
            } else {
              console.log('Update success!');
            }
          });
          ctx.body = util.successRes({
            msg: '修改成功',
            data: ctx.request.body
          })
        } else {
          ctx.body = util.failRes({
            msg: '密码修改失败',
            data: ctx.request.body
          })
        }
      }
    });
  }
  async reg() {
    const {
      ctx
    } = this;
    const {
      company,
      userName,
      phone,
      password
    } = ctx.query;
    //添加信息到user表
    const UserEntity = new UserModel({
      token: md5(`${ctx.request.body.userName}${ctx.request.ctx.starttime}`),
      accout: ctx.request.body.phone,
      password: ctx.request.body.password
    });
    UserEntity.save()
    //添加信息到UserMessage表
    const UserMessageEntity= new UserMessageModel({
      token: md5(`${ctx.request.body.userName}${ctx.request.ctx.starttime}`),
      userName: ctx.request.body.userName,
      phone: ctx.request.body.phone,
      company: ctx.request.body.company,
    });
    UserMessageEntity.save()
    ctx.body = util.successRes({
      msg: '注册成功',
      data: ctx.request.body
    })
  }
}

module.exports = HomeController;