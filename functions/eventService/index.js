// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
const MAX_LIMIT = 100
const COLLECTION_NAME = "Event"
// exports.main = async (event, context) => {
//   // 先取出集合记录总数
//   const countResult = await db.collection(COLLECTION_NAME).count()
//   const total = countResult.total
//   // 计算需分几次取
//   const batchTimes = Math.ceil(total / 100)
//   console.log("Event table data count:",batchTimes);
//   // 承载所有读操作的 promise 的数组
//   const tasks = []
//   for (let i = 0; i < batchTimes; i++) {
//     const promise = db.collection(COLLECTION_NAME).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
//     tasks.push(promise)
//   }
//   // 等待所有
//   return (await Promise.all(tasks)).reduce((acc, cur) => {
//     return {
//       data: acc.data.concat(cur.data),
//       errMsg: acc.errMsg,
//     }
//   })
// }

exports.main = async (event, context) => {
  return await db.collection(COLLCTION_NAME).get()

// Example:
//
// wx.cloud.init()
// wx.cloud.callFunction({
//   name: 'eventService'
// }).then(res => {
//   console.log("eventService", res);
// }).catch(console.error)