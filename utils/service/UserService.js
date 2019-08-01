const Util = require("../util");
const COLLECTION_USER = "User";
const COLLECTION_ORDERS = "Orders";
const COLLECTION_USER_ADDRESS = "User_Address";
const db = wx.cloud.database();

module.exports = {


    setNewOrderInOrderList: (orderId)=>{
        return new Promise((resolve, reject) => {
            db.collection(COLLECTION_USER)
                .where({
                    openId: wx.getStorageSync('openid')
                })
                .field({
                    _id: true,
                    orderList: true
                }).get()
                .then((res) => {
                    if (res.data.length == 0){
                        reject("setNewOrderInOrderList 没有拿到数据", orderId);
                    }
                    let currOrderList = res.data[0].orderList;
                    currOrderList.push(orderId);
                    db.collection(COLLECTION_USER).doc(res.data[0]._id).update({
                        // data 传入需要局部更新的数据
                        data: {
                            orderList: currOrderList
                        },
                        success: function(res){
                            console.log(res);
                            resolve(res);
                        },
                        fail: function(err){
                            console.log(err);
                            reject(err);
                        }
                    });
                })
                .catch(err => {

                });
        });
    },

    getCurrUserBoughtEvents: (currUserOpenId) => {
      const db = wx.cloud.database();
      let currUserBoughtEvents = [];
    
        return new Promise((resolve, reject) => {
            db.collection(COLLECTION_USER)
                .where({
                    openId: currUserOpenId
                })
                .field({
                    orderList: true
                })
                .get().then(data => {
                    let rawData = data.data;

                    // debugger;

                    if (rawData instanceof Array
                        && rawData.length > 0) {
                        let rawOrderList = rawData[0].orderList;
                        if (rawOrderList) {
                            return Promise.all(
                                rawOrderList.map(item => {
                                    return new Promise((resolve, reject) => {
                                        db.collection(COLLECTION_ORDERS)
                                            .where({
                                                _id: item
                                            })
                                            .field({
                                                event: true
                                            })
                                            .get().then(data => {
                                                if (data && data.data) {
                                                    currUserBoughtEvents.push(data.data[0].event);
                                                    resolve();
                                                }
                                            });
                                    });

                                })).then(() => {
                                    resolve(currUserBoughtEvents);
                                }).catch(err=>{
                                    console.log(err);
                                    reject(err);
                                });
                        };
                    } else {
                        resolve([]);
                    }
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
     

    },
    //return await currUserBoughtEvents;

    /**
     * @description
     * 向数据库存入新的收货地址
     * addressName,addressPersonName,addressPhone,openId
     * 
     */

    setNewCustomAddress: (dbModel)=> {
        
        return new Promise ((resolve,reject)=>{
            const _ = db.command;
            try{
                db.collection(COLLECTION_USER_ADDRESS)
                .add({
                    data: dbModel,
                    success: function (res) {
                        console.log(res);
                        resolve(res);
                    },
                    fail:function(err){
                        console.log(err);
                        reject(err);
                    }
                })
            }catch(e){
                console.log(e);
                reject(e);
            }
        });
    }
}