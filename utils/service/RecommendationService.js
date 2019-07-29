const Util = require("../util");
const COLLECTION_USER = "User";
const COLLECTION_ORDERS = "ORDERS";
import regeneratorRuntime from './../runtime';

module.exports = {

     getCategoryByTags(tags){

        let tagsPassenger = JSON.stringify(tags);
        let data = `?tags=${tagsPassenger}`;
        let url = "https://www.ourwhale.com/recommendation/getClassifyByTagArray"+ data;
        return new Promise((resolve,reject)=>{
            wx.request({
                url: url,
                header: {
                },
                success(res) {
                   resolve(res.data);
                },
                fail(err){
                 console.log(err);
                 reject(err);
                }
              });
        });

    },

    getSortedClassifyArrayByTagArrays(tagsArray){
        let url = "https://www.ourwhale.com/recommendation/getSortedClassifyArrayByTagArrays";
        return new Promise((resolve,reject)=>{
            wx.request({
                url: url,
                data: {
                    "tagsArray":tagsArray
                },
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function(res){
                    // success
                    resolve(res.data);
                },
                fail: function(err) {
                    // fail
                    console.log(err);
                    reject(err);
                }
            })
        });
    },

    sendAllEventTypeAndTagsForTraining(allProcessedEvents){
        let trainsetMap = {};
        if (allProcessedEvents instanceof Array){
            allProcessedEvents.map(item =>{
                trainsetMap[item.type] = item.tags;
            });
            let url = "https://www.ourwhale.com/recommendation/retrain";
            return new Promise((resolve, reject)=>{
                wx.request({
                    url: url,
                    data: trainsetMap,
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function(res){
                        // success
                        resolve(res.data);
                    },
                    fail: function(err) {
                        // fail
                        console.log(err);
                        reject(err);
                    }
                })
            });
        }
    },

    getRecommendedEvents(allProcessedEvents, usersTypes){
        let recommendedEvents = [];
        if (allProcessedEvents instanceof Array
            && usersTypes instanceof Array){
            allProcessedEvents.map(item =>{
                let currType = item.type;
                if (usersTypes.includes(currType)){
                    recommendedEvents.push(item);
                }
            });
        }
        return recommendedEvents;
    }


}