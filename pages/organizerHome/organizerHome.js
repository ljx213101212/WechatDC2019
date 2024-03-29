// pages/organizerHome/organizerHome.js
const app = getApp();
import languageToggle from '../../utils/localization.js';
const localizationText = languageToggle();
Page({

  /**
   * Page initial data
   */
  data: {
    text:{}
  },
  onPressEventView:function(){
    wx.navigateTo({
      url: '/pages/eventAdmin/eventAdmin',
    })
  },
  loadLocalizedText() {
    // checking the phone's language and setting the text on the screen
    if (app.globalData.language === 'zh') {
      this.setData({
        text: localizationText[8].zh,
        currentLang: 'zh'
      });
    } else {
      this.setData({
        text: localizationText[8].en,
        currentLang: 'en'
      });
    }
  },
  changeLanguage: function () {
    const self = this;
    // flips the language from english to chinese and back
    if (app.globalData.language === 'zh') {
      self.setData({
        text: localizationText[8].en,
        currentLang: 'en'
      });
    } else {
      self.setData({
        text: localizationText[8].zh,
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
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.loadLocalizedText();
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