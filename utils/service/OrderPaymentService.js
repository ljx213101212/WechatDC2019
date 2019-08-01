const Util = require("../util");
const EventService = require("../service/EventService");
const COLLECTION_ORDERS = "Orders";
const db = wx.cloud.database();

module.exports = {



    /**
     * 通过eventId 和 openId 来生成插入数据库的order dbModel
     */
    getNewOrderInDbModel:(eventId,openId)=>{
        
        let dbModel = {
            address:"",
            event:{},
            openId:"",
            price:"",
            qrcodeURL:"",
            quantity:1,
            ticketName:"",
            time:Util.getNowTimeInDateObject()
        };
        return new Promise((resolve,reject)=>{
            //Get Event Obj.
            EventService.getEventByIdFromDb(eventId)
                .then(eventObj => {
                    dbModel.address = Util.getAddressStr(eventObj.address);
                    dbModel.event = eventObj;
                    dbModel.openId = openId;
                    dbModel.price = eventObj.price;
                    dbModel.qrcodeURL = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + openId + '*' + eventId;
                    dbModel.quantity = 1;
                    dbModel.ticketName = eventObj.name;
                    resolve(dbModel);
                })
                .catch(err => {
                    console.log("创建NewOrderInDbModel失败, 原因为: ", JSON.stringify(err));
                    reject(err);
                });
        });
      
    },

    /**
     * @description
     * 生成新的order 数据
     * 
     */

    generateNewOrder: (dbModel)=> {
        
        return new Promise ((resolve,reject)=>{
            const _ = db.command;
            try{
                db.collection(COLLECTION_ORDERS)
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