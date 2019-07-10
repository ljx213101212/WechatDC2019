// pages/home/home.js
import downloadMedia from '../../utils/tih_api/downloadMedia.js';

Page({

  /**
   * Page initial data
   */
  data: {
    imgSwiperUrls: [
      'https://s3-ap-southeast-1.amazonaws.com/saceos/files/rAjpdogCei.jpeg',
      'https://tih-api.stb.gov.sg/media/v1/download/uuid/101f6712129e9154639870adaa47195c2b0?apikey=SJnO6lGuhYLfn3VjOejbSLgvljFZ0sM1',
      'https://s3-ap-southeast-1.amazonaws.com/saceos/files/MIqzUf5RtM.jpeg'
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    downloadMedia('101f6712129e9154639870adaa47195c2b0').then(res => {
      console.log("downloadMedia:", res);
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