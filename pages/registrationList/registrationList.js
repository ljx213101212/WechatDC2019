// pages/registrationList/registrationList.js
const db = wx.cloud.database();
Page({

  /**
   * Page initial data
   */
  data: {
    registrationList:[],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getRegistrationList();
  },
  
  getRegistrationList:function(){
    const self = this;
    db.collection('Event_Registration').where({
      eventUuid: "004666261d592ff4c9a86e1b57e206f7f3b",
    }).get({
      success: function (res) {
        self.setData({
          registrationList:res.data
        })
      }
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