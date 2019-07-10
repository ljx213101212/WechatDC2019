// pages/home/home.js
const EventService = require('../../utils/service/EventService');

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
    recentEvents:[]
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
    this.setData(
      { 
        recentEvents :EventService.getRecentDetail()
      });

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.getTabBar();
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

  onNavigateToEventDetailPage: function (e){
    let eventId = e.currentTarget.dataset.activeId;
    wx.navigateTo({
      url: `/pages/eventDetail/eventDetail?uuid=${eventId}`,
    //   events: {
    //     // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    //     acceptDataFromOpenedPage: function (data) {
    //       console.log(data)
    //     },
    //     someEvent: function (data) {
    //       console.log(data)
    //     }
 
    //  },
      // success: function (res) {
      //   // 通过eventChannel向被打开页面传送数据
      //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      // }
    });
  }
})
