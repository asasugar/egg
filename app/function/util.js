const util={};
// 成功回调
util.successRes=({msg,data})=>{
    const res={
        success:true,
        msg,
        data
    };
    return res
}
// 失败回调
util.failRes=({msg,data})=>{
    const res={
        success:false,
        msg,
        data
    };
    return res
}
module.exports= util;