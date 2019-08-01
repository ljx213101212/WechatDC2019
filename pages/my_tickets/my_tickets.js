// pages/my_tickets/my_tickets.js
const db = wx.cloud.database();
Page({

  /**
   * Page initial data
   */
  data: {
    myTickets:[]
  },
  onPressOneTicket:function(e){
    let eventId = e.currentTarget.id;
    let eventOrigin = e.currentTarget.dataset.origin;
    let eventOriginPassenger = "{}";
    try {
      eventOriginPassenger = JSON.stringify(eventOrigin);
    } catch (e) {
      console.log(e);
    }
    wx.navigateTo({
      url: `/pages/ticketDetail/ticketDetail?eventId=${eventId}`,
      events: {
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: eventOriginPassenger
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.loadMyUnCheckedEvents();
  },

  loadMyUnCheckedEvents:function(){
    const self = this;
    db.collection("Orders").where({ openId: wx.getStorageSync("openid"),checkIn:false }).get().then(res => {
      wx.setStorageSync('myTickets', res.data);
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].event.startDate = new Date(res.data[i].event.startDate).toDateString();
      }
      self.setData({
        myTickets: res.data
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