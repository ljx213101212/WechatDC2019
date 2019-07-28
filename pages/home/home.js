// pages/home/home.js
const EventService = require('../../utils/service/EventService');
const UserService = require('../../utils/service/UserService');
const RecommendationService = require('../../utils/service/RecommendationService');
const Util = require('../../utils/util');
const COLLECTION_NAME = "Event";


Page({

  /**
   * Page initial data
   */
  data: {
    imgSwiperUrls: [
      'https://s3-ap-southeast-1.amazonaws.com/saceos/files/rAjpdogCei.jpeg',
      'https://tih-api.stb.gov.sg/media/v1/download/uuid/101f6712129e9154639870adaa47195c2b0?apikey=SJnO6lGuhYLfn3VjOejbSLgvljFZ0sM1',
      'https://s3-ap-southeast-1.amazonaws.com/saceos/files/MIqzUf5RtM.jpeg'
    ],
    recentEvents: [],
    filteredRecentEvents:[],
    recentEventsFilterSelecteText:[true,false,false,false,false],
    recommendedEvents:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    // this.setData(
    //   {
    //     recentEvents: EventService.getRecentDetail()
    //   });

    const db = wx.cloud.database()
    db.collection(COLLECTION_NAME).get().then(res => {
      console.log(res.data);
      //preprocessing data.
      let processedData = EventService.preProcessingEventData(res.data);
      console.log(processedData);
      this.setData({
        recentEvents:processedData,
        filteredRecentEvents:processedData
      });

      //从缓存当中拿取openid.
      let currUserOpenId = wx.getStorageSync('openid');
       UserService.getCurrUserBoughtEvents(currUserOpenId).then((currUserBoughtEvents)=>{
        currUserBoughtEvents.map((item,index)=>{
          RecommendationService.getCategoryByTags(item.tags).then((currCategory) =>{
            console.log(currCategory);
          });
        });
      });
    });

   
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onNavigateToEventDetailPage: function (e) {
    let eventId = e.currentTarget.id;
    let eventOrigin = e.currentTarget.dataset.origin;
    let eventOriginPassenger = "{}";
    try{
      eventOriginPassenger = JSON.stringify(eventOrigin);
    }catch(e){
      console.log(e);
    }
    wx.setStorageSync('eventOriginSnapshotJsonStr', eventOriginPassenger);
    /**
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
     */
    wx.navigateTo({
      url: `/pages/eventDetail/eventDetail?eventId=${eventId}`,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data) {
            console.log(data)
          },
          someEvent: function (data) {
            console.log(data)
          }
       },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: eventOriginPassenger })
      }
    });
  },

  onClickAll:function(e){
    this.setData({
      filteredRecentEvents:this.data.recentEvents,
      recentEventsFilterSelecteText: [true,false,false,false,false]
    });
  },

  onClickToday:function(e){
    //filter recentEvents -> today only.
    let filteredEvents = EventService.filterEvent(this.data.recentEvents,Util.constants.TODAY);
    this.setData({
      filteredRecentEvents:filteredEvents,
      recentEventsFilterSelecteText: [false,true,false,false,false]
    });
  },

  onClickTomorrow:function(e){
    let filteredEvents = EventService.filterEvent(this.data.recentEvents,Util.constants.TOMORROW);
    this.setData({
      filteredRecentEvents:filteredEvents,
      recentEventsFilterSelecteText: [false,false,true,false,false]
    });
  },

  onClickThisWeek:function(e){
    let filteredEvents = EventService.filterEvent(this.data.recentEvents,Util.constants.THIS_WEEK);
    this.setData({
      filteredRecentEvents:filteredEvents,
      recentEventsFilterSelecteText: [false,false,false,true,false]
    });
  },

  onClickNextWeek:function(e){
    let filteredEvents = EventService.filterEvent(this.data.recentEvents,Util.constants.NEXT_WEEK);
    this.setData({
      filteredRecentEvents:filteredEvents,
      recentEventsFilterSelecteText: [false,false,false,false,true]
    });
  },


  onNavigateToRestaurantPage: function (e) {
    /**
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
     */
    wx.navigateTo({
      url: `/pages/restaurantRecommendation/index`,
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   acceptDataFromOpenedPage: function (data) {
      //     console.log(data)
      //   },
      //   someEvent: function (data) {
      //     console.log(data)
      //   }
      // },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: eventOriginPassenger })
      }
    });
  }


})


