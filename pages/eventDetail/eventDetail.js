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
    /**
     * @todo 这边是否购买需要在user 表里面存状态
     */
    let dummyIsPurchased = false;
    this.setData({ isPurchased: dummyIsPurchased });
    
    //测试页面之间传递数据的新方法
    const eventChannel = this.getOpenerEventChannel();
    //接受父页面传过来的值
    eventChannel.on('acceptDataFromOpenerPage', function(eventOriginPassenger) {
      console.log("哦耶，我接受到了上一个页面传过来的超长字符串",eventOriginPassenger)
    })
    //向父页面回传数据
    eventChannel.emit('acceptDataFromOpenedPage', {data: '这是从eventDetail 传回来的数据, 我是 acceptDataFromOpenedPage'});
    eventChannel.emit('someEvent', {data: '这是从eventDetail 传回来的数据，我是some Event'});
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