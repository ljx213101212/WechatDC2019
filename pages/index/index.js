//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
    // Do something when page ready.
    console.log("index is ready");
  },
  onShow: function () {
    // Do something when page show.
    console.log("index page shows");
  },
  onHide: function () {
    // Do something when page hide.
    console.log("index page hides");
  },
  onUnload: function () {
    // Do something when page close.
    console.log("index page close");
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
    console.log("index page pull down refresh");
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log("index page reached the bottom");
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
    console.log("index page is sharing app message");
  },
  onPageScroll: function () {
    // Do something when page scroll
    console.log("index page is scrolling")
  },
  onResize: function () {
    // Do something when page resize
    console.log("index page is resizing.");
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  pageEventListener1: function (e) {
    console.log('pageEventListener1', e)
  },
  pageEventListener2: function (e) {
    console.log('pageEventListener2', e)
  }
})
