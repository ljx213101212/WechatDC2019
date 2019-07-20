// pages/eventAdmin/eventAdmin.js
Page({

  /**
   * Page initial data
   */
  data: {

  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
  },
  onPressQRCheckIn:function(){
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  onPressRegistrationList:function(){
    wx.navigateTo({
      url: '/pages/registrationList/registrationList',
    })
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