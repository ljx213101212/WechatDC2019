// pages/me/me.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database();

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myFavoritesCount:0
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  checkUserInfo: function(e) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  onPressMyOrders:function(){
    wx.navigateTo({
      url: '/pages/my_orders/my_orders',
    })
  },
  onPressMyTickets: function () {
    wx.navigateTo({
      url: '/pages/my_tickets/my_tickets',
    })
  },
  onPressMyAddresses:function(){
    wx.navigateTo({
      url: '/pages/selectAddress/selectAddress',
    })
  },
  onPressMyCoupons:function(){
    wx.navigateTo({
      url: '/pages/myCoupons/myCoupons',
    })
  },
  onPressIamOrganizer: function () {
    wx.navigateTo({
      url: '/pages/organizerHome/organizerHome',
    })
  },
  onPressMyFavorites:function(){
    wx.navigateTo({
      url: '/pages/my_favorites/my_favorites',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.checkUserInfo();
  },
  loadMyFavorites: function () {
    const self = this;
    db.collection("User_LikeEvents").where({ _openid: wx.getStorageSync("openid"), liked: true }).get().then(res => {
      self.setData({
        myFavoritesCount: res.data.length
      })
      wx.setStorageSync('myFavorites', res.data);
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {
    this.loadMyFavorites();
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})