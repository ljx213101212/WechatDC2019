// pages/my_notifications/my_notifications.js
const db = wx.cloud.database();
Page({

  /**
   * Page initial data
   */
  data: {
    myNotifications:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.loadMyNotifications();
  },

  loadMyNotifications:function(){
    var myNotificationsCache = wx.getStorageSync("myNotifications");
    if(!myNotificationsCache || myNotificationsCache.length==0){
      const self = this;
      db.collection("User_Notifications").where({ openid: wx.getStorageSync("openid"), enabled: true }).get().then(res => {
        myNotificationsCache = res.data;
        wx.setStorageSync('myNotifications', res.data);
        self.setData({
          myNotifications: myNotificationsCache
        })
      })
    }
    this.setData({
      myNotifications: myNotificationsCache
    })
    
  },
  onPressDeleteNotification:function(e){
    if(e.currentTarget.id){
      const self = this;
      db.collection("User_Notifications").doc(e.currentTarget.id).update({
        data:{
          enabled:false
        }
      }).then(console.log)
        .catch(console.error)
      var newNotifications = [];
      for(var i=0;i<self.data.myNotifications;i++){
        if(e.currentTarget.id!==self.data.myNotifications[i]._id){
          newNotifications.push(self.data.myNotifications[i]);
        }
      }
      self.setData({
        myNotifications:newNotifications
      })
    }
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