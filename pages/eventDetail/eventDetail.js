// pages/eventDetail/eventDetail.js
import listEventTypes from '../../utils/tih_api/listEventTypes.js';
import searchAll from '../../utils/tih_api/searchAll.js';
import fileService from '../../utils/service/FileService.js'
Page({

  /**
   * Page initial data
   */
  data: {
      eventId:-1,
      isPurchased:false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options.uuid);
    this.setData({eventId:options.uuid});
    let dummyIsPurchased = false;
    this.setData({ isPurchased: dummyIsPurchased });
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    // listEventTypes().then(res => {
    //   console.log("listEventTypes:", res);
    // })
    searchAll('event', 'name','ASC','en').then(res => {
      console.log("searchAll:", res);
      console.log(wx.env.USER_DATA_PATH);
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