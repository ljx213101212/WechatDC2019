//const Event = require('../models/Event');
const DummyRecentEvent = require('../dummy_data/dummyRecentEvent');
const Util = require("../util");

module.exports = {
  // getAll: async function () {
  //   return await Event.getAll();
  // },

  // getDetail: async function (id) {
  //   return await Event.findOne({ eventId: id });
  // },

  getRecentDetail: function(){
     return DummyRecentEvent;
  },

  //主页面
  preProcessingEventData:function(data){
    var dummyImageUrl = "https://s3-ap-southeast-1.amazonaws.com/saceos/files/rAjpdogCei.jpeg";
    var events = [];
    if (data instanceof Array){
       data.map((item,index)=>{
         let event = {};
         event.activeId = item.uuid;
         event.activeTitle = item.name;
         event.price = item.price;
         event.origin = item;
       
         if(item.images.length > 0){
           event.activeImg = item.images[0].url;
         }else{
           event.activeImg = dummyImageUrl;
         }
        events.push(event);
      });
    }
    return events;
  },

  //详细页面
  preProcessingEventDataInDetailPage:function(data){
    var dummyDetailUrl = "/utils/img/eventDetail/eventDetail.png";
    var event = {};
    if (data instanceof Object){
      event.activeId = data.uuid;
      event.activeTitle = data.name;
      event.price = data.price;
      event.pricingStatus = Util.isYorN(data.ticketed);
      event.startTime = Util.getSpecificTimeStr(data.startDate);
      event.endTime = Util.getSpecificTimeStr(data.endDate);
      event.address = data.address;
      event.addressStr = Util.getAddressStr(data.address);
      event.location = data.location;
      event.eventInfoStr = Util.escapeHelper(data.body);

      if(data.images.length > 0){
        event.activeImg = data.images[0].url;
      }else{
        event.activeImg = dummyDetailUrl;
      }
      return event;
    }
  }
};