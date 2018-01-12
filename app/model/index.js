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
// const ProductEntity = new ProductModel({
//     pType:['工科医类','家电类','灯具类','无线射频类','汽车电子类','电源类','多媒体类'],
//     pV:['直流','单相','三相'],
//     pI:['直流','单相','三相'],
//     pF:['直流','单相','三相'],
//     pVW:['直流','单相','三相']
// });
// ProductEntity.save()

module.exports = {
    UserModel,
    ProductModel
};