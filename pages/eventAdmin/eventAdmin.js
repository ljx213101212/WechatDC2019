// pages/eventAdmin/eventAdmin.js
const db = wx.cloud.database();
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
    const self = this;
    wx.scanCode({
      success(res) {
        var openid = res.result.split('*')[0];
        var eventid = res.result.split('*')[1];
        self.checkIn(openid, eventid);
      }
    })
  },
  onPressRegistrationList:function(){
    wx.navigateTo({
      url: '/pages/registrationList/registrationList',
    })
  },
  checkIn:function(openid, eventid){
    db.collection('Event_Registration').where({
      openid: openid,
      eventUuid: "004666261d592ff4c9a86e1b57e206f7f3b",
    }).get({
      success: function (res) {
        var record = res.data[0];
        console.log(res);
        db.collection('Event_Registration').doc(record._id).update({
          // data 传入需要局部更新的数据
          data: {
            checkedIn: true
          },
          success: console.log,
          fail: console.error
        })
      }
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