// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}


// Example:
//
// wx.cloud.init()
// wx.cloud.callFunction({
//   name: 'login'
// }).then(res => {
//   console.log("login", res);
// }).catch(console.error)