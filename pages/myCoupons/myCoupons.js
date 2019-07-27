// pages/myCoupons/myCoupons.js
const db = wx.cloud.database();
Page({

  /**
   * Page initial data
   */
  data: {
    myCoupons:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.loadMyCoupons();
  },

  loadMyCoupons:function(){
    const self = this;
    db.collection("User_Coupons").where({ openid: wx.getStorageSync("openid"), enabled: true }).get().then(res => {
      wx.setStorageSync('myCoupons', res.data);
      self.setData({
        myCoupons: res.data
      })
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