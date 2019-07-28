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

  //主页面数据绑定输入数据处理
  preProcessingEventData:function(data){
    var dummyImageUrl = "https://s3-ap-southeast-1.amazonaws.com/saceos/files/rAjpdogCei.jpeg";
    var events = [];
    if (data instanceof Array){
       data.map((item,index)=>{
         let event = {};
         event.id = item._id;
         event.activeId = item.uuid;
         event.activeTitle = item.name;
         event.price = item.price;
         event.startTime = Util.getSpecificTimeStr(item.startDate);
         event.endTime = Util.getSpecificTimeStr(item.endDate);
         event.tags = item.tags;
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

  //详细页面数据绑定输入数据处理
  preProcessingEventDataInDetailPage:function(data){
    var dummyDetailUrl = "/utils/img/eventDetail/eventDetail.png";
    var event = {};
    if (data instanceof Object){
      event.id = item._id;
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
      event.tags = item.tags;

      if(data.images.length > 0){
        event.activeImg = data.images[0].url;
      }else{
        event.activeImg = dummyDetailUrl;
      }
      return event;
    }
  },


  /**
   * 
   * @param {*} allEvents processed page data
   * @param {*} byWhat - today,tomorrow, this_week, next_week
   * @returns
   * filtered event array.
   */
  filterEvent:function(allEvents, byWhat){

    let filteredEvent = [];
    if (allEvents instanceof Array) {
      allEvents.map((item, index) => {
        let startTimeStr = item.startTime;
        let endTimeStr = item.endTime;
        switch (byWhat) {
          case Util.constants.TODAY:
            if (Util.isTodayInbetweenTimeStrs(startTimeStr,endTimeStr)) {
              filteredEvent.push(item);
            }
            break;
          case Util.constants.TOMORROW:
            if (Util.isTomorrowInBetweenTimeStrs(startTimeStr,endTimeStr)) {
              filteredEvent.push(item);
            }
            break;
          case Util.constants.THIS_WEEK:
            if (Util.isThisWeekInBetweenTimeStrs(startTimeStr,endTimeStr)) {
              filteredEvent.push(item);
            }
            break;
          case Util.constants.NEXT_WEEK:
            if (Util.isNextWeekInBetweenTimeStrs(startTimeStr,endTimeStr)) {
              filteredEvent.push(item);
            }
            break;
          default:
            break;
        }
      });
    }
   return filteredEvent;
  },

 /**
  * 
  * @param {*} eventId not uuid, its _id
  */
  getEventsByIds:function(allEvents,eventId){
    let events = [];
    if (allEvents instanceof Array) {
        allEvents.map((item,index) =>{
            if (item.id === eventId){
              events.push(item);
            }
        });
    }
    return events;
  }

};