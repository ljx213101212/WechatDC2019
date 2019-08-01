// pages/ticketDetail/ticketDetail.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid');
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
    try {
      eventOrigin = JSON.parse(eventOriginPassenger);
      
      eventOrigin.startDate = new Date(eventOrigin.startDate).toDateString();
      
      //设置页面数据
      this.setData({
        event: eventOrigin,
        eventId: options.eventId
      }, () => {
        //callback 取消页面加载
        wx.hideLoading();
      });
    } catch (e) {
      console.log(e);
      wx.hideLoading();
    }
    var qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + openid + '*' + this.data.eventId;
    this.setData({
      qrCodeUrl: qrCodeUrl
    })

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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

  }
})