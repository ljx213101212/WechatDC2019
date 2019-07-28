

Page({

  /**
   * Page initial data
   * @example
   * (pageData schema)
   * event.activeId
   * event.activeTitle
   * event.price 
   * event.pricingStatus
   * event.startTime
   * event.endTime
   * event.address
   * event.addressStr
   * event.location
   * event.eventInfoStr
   * event.activeImg 
   */
  data: {
    eventId: -1,
    pageData: {},
    isPurchased: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    //先显示页面加载
    // wx.showLoading({
    //   title: '加载中 Loading',
    // });
    console.log('-=========get location start');
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log('res=====', res);
        // //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        // qqmapsdk.reverseGeocoder({
        //   location: {
        //     latitude: res.latitude,
        //     longitude: res.longitude
        //   },
        //   success: function (addressRes) {
        //     var address = addressRes.result.formatted_addresses.recommend;
        //     that.setData({
        //       console.log(address)
        //     })
        //   }
        // })
      }
    })
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    // listEventTypes().then(res => {
    //   console.log("listEventTypes:", res);
    // })
    searchAll('event', 'name', 'ASC', 'en').then(res => {
      console.log("searchAll:", res);
      //console.log(wx.env.USER_DATA_PATH);
      // fileService.writeTempFile(wx.env.USER_DATA_PATH,"temp.json",res);
      // fileService.readTempFile(wx.env.USER_DATA_PATH,"temp.json");
    })
  },

  /**
   * Lifecycle function--Called when page showe
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