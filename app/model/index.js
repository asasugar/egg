var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1:27017/mydb");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("数据库连接成功");
});
//只有schema中有的属性才能被保存到数据库中
/* 用户表-----S */
var UserSchema = new mongoose.Schema({
    accout: {
        type: String
    },
    password: {
        type: String
    },
    token:{
        type: String
    }
});
var UserModel = db.model("user", UserSchema);
/* 用户表-----E */

/* 产品表-----S */
var ProductSchema = new mongoose.Schema({
    pType: {
        type: Array
    },
    pV: {
        type: Array
    },
    pI: {
        type: Array
    },
    pF: {
        type: Array
    },
    pVW: {
        type: Array
    },
});
var ProductModel = db.model("product", ProductSchema);
/* 产品表-----E */

/* 用户信息表-----S */
var UserMessageSchema = new mongoose.Schema({
    token: {
        type: String
    },
    userName: {
        type: String
    },
    phone:{
        type:String
    },
    company: {
        type: String
    },
});
var UserMessageModel = db.model("userMessage", UserMessageSchema);
/* 用户信息表-----E */
// const UserEntity = new UserMessageModel({
//     token:'6cd48c326299f622fb7e459b53eebe42',
//     userName:'薛雄杰',
//     company:'狂拽酷炫屌炸天技术有限公司',
//     phone:'18059156737'
// });
// UserEntity.save()

module.exports = {
    UserModel,
    ProductModel,
    UserMessageModel
};