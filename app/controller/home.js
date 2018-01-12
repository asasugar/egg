'use strict';
const {UserModel,ProductModel} = require('../model/index')
const Controller = require('egg').Controller;
const util = require('../function/util');
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async addUser() {
    const {ctx} = this;
    const {
      accout,
      password
    } = ctx.query;
    const UserEntity = new UserModel({
      accout,
      password
    });
    await UserEntity.save(function(err,doc){
      if(err) {
        console.log(err)
      } else {
        ctx.body=util.successRes({
          msg:'保存成功',
          data:ctx.query
        })
      }
    });
  }
  async login(){
    const {ctx} = this;
    const {
      accout,
      password
    } = ctx.query;
    await UserModel.find(ctx.request.body,function(err,doc){
      if(err) {
        console.log(err)
      } else {
        console.log(doc.length)
        if(doc.length===1) {
          ctx.body=util.successRes({
            msg:'登录成功',
            data:ctx.request.body
          })
        }else {
          ctx.body=util.failRes({
            msg:'登录失败',
            data:ctx.request.body
          })
        }
      }
    });
  }
  async product(){
    const {ctx}=this;
    await ProductModel.find(function(err,doc){
      if(err){
        console.log(err)
      } else {
        ctx.body=util.successRes({
          msg:'查询成功',
          data:doc
        })
      }
    });
    
  }
}

module.exports = HomeController;