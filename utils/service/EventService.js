//const Event = require('../models/Event');
const DummyRecentEvent = require('../dummy_data/dummyRecentEvent');

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

  preProcessingEventData:function(data){
    var dummyImageUrl = "https://s3-ap-southeast-1.amazonaws.com/saceos/files/rAjpdogCei.jpeg";
    var events = [];
    if (data instanceof Array){
       data.map((item,index)=>{
         let event = {};
         event.activeId = item.uuid;
         event.activeTitle = item.name;
         event.price = item.price;
       
         if(item.images.length > 0){
           event.activeImg = item.images[0].url;
         }else{
           event.activeImg = dummyImageUrl;
         }
        events.push(event);
      });
    }
    return events;
  }
};