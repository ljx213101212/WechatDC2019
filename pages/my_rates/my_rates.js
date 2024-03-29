// pages/my_rates/my_rates.js
const app = getApp();
import languageToggle from '../../utils/localization.js';
const localizationText = languageToggle();
const db = wx.cloud.database();

Page({

  /**
   * Page initial data
   */
  data: {
    text: {}
  },

  onPressRateTheEvent:function(e){
    let eventId = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/rate/rate?eventId=${eventId}`,
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.loadLocalizedText();
    this.loadNeedMyRateOrders();
  },
  loadNeedMyRateOrders: function () {
    const self = this;
    db.collection("Orders").where({ openId: wx.getStorageSync("openid"), rated: false }).get().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].event.startDate = new Date(res.data[i].event.startDate).toDateString();
      }
      self.setData({
        myToRateEvents: res.data
      })
    })
  },

  loadLocalizedText() {
    // checking the phone's language and setting the text on the screen
    if (app.globalData.language === 'zh') {
      this.setData({
        text: localizationText[7].zh,
        currentLang: 'zh'
      });
    } else {
      this.setData({
        text: localizationText[7].en,
        currentLang: 'en'
      });
    }
  },
  changeLanguage: function () {
    const self = this;
    // flips the language from english to chinese and back
    if (app.globalData.language === 'zh') {
      self.setData({
        text: localizationText[7].en,
        currentLang: 'en'
      });
    } else {
      self.setData({
        text: localizationText[7].zh,
        currentLang: 'zh'
      });
    }
    wx.setStorage({
      key: 'language',
      data: this.data.currentLang
    })
    app.globalData.language = this.data.currentLang;
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