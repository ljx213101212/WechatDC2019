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

    }


}