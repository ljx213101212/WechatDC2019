// pages/eventDetail/eventDetail.js
import listEventTypes from '../../utils/tih_api/listEventTypes.js';
import searchAll from '../../utils/tih_api/searchAll.js';
import fileService from '../../utils/service/FileService.js'
import EventService from '../../utils/service/EventService';

Page({

  /**
   * Page initial data
   * @example
   * (pageData schema)
   * event.activeId
   * event.activeTitle
   * event.price 
   * event.pricingStatus
   * event.startTime
   * event.endTime
   * event.address
   * event.addressStr
   * event.location
   * event.eventInfoStr
   * event.activeImg 
   */
  data: {
      eventId:-1,
      pageData: {},
      isPurchased:false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
    //先显示页面加载
    wx.showLoading({
      title: '加载中 Loading',
    });

    //打印传递数据
    console.log(options.eventId);
    //读取全局缓存拉current event 的snapshot.
    let eventOriginPassenger = wx.getStorageSync('eventOriginSnapshotJsonStr');

    //页面数据parsing
    let eventOrigin = {};
    let pageData = {};
    try{
      eventOrigin = JSON.parse(eventOriginPassenger);
      pageData = EventService.preProcessingEventDataInDetailPage(eventOrigin);
      console.log(pageData);
      //设置页面数据
      this.setData({pageData:pageData},()=>{
        //callback 取消页面加载
        wx.hideLoading();
      });
    }catch(e){
      console.log(e);
      wx.hideLoading();
    }
    let dummyIsPurchased = false;
    this.setData({ isPurchased: dummyIsPurchased });
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    // listEventTypes().then(res => {
    //   console.log("listEventTypes:", res);
    // })
    searchAll('event', 'name','ASC','en').then(res => {
      console.log("searchAll:", res);
      //console.log(wx.env.USER_DATA_PATH);
      // fileService.writeTempFile(wx.env.USER_DATA_PATH,"temp.json",res);
      // fileService.readTempFile(wx.env.USER_DATA_PATH,"temp.json");
    })
  },

  /**
   * Lifecycle function--Called when page showe
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

  }
})