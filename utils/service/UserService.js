const Util = require("../util");
const COLLECTION_USER = "User";
const COLLECTION_ORDERS = "Orders";

module.exports = {

    getCurrUserBoughtEvents: (currUserOpenId) => {
        const db = wx.cloud.database();
        let currUserBoughtEvents = [];

        return new Promise((resolve, reject) => {
            try {
                //从云数据库中拿取当前用户信息
                db.collection(COLLECTION_USER)
                    .where({
                        openId: currUserOpenId
                    })
                    .field({
                        orderList: true
                    })
                    .get().then(data => {
                        let rawData = data.data;
                        if (rawData instanceof Array
                            && rawData.length > 0) {
                            let rawOrderList = rawData[0].orderList;
                            if (rawOrderList) {
                                Promise.all(
                                    rawOrderList.map(item => {
                                        return new Promise((resolve,reject)=>{
                                            db.collection(COLLECTION_ORDERS)
                                            .where({
                                                _id: item
                                            })
                                            .field({
                                                event: true
                                            })
                                            .get().then(data => {
                                                if (data && data.data){
                                                    currUserBoughtEvents.push(data.data[0].event);
                                                    resolve();
                                                }
                                            });
                                        });
                                      
                                    })).then(() => {
                                        resolve(currUserBoughtEvents);
                                    });
                            };
                        }
                    });
            } catch (e) {
                reject(e);
            }

        });
    }
    //return await currUserBoughtEvents;


}