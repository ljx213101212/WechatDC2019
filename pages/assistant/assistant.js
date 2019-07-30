// pages/assistant/assistant.js
const app = getApp();
import languageToggle from '../../utils/localization.js';
const localizationText = languageToggle();
Page({
  handleContact(e) {
    console.log(e.path)
    console.log(e.query)
  },

  /**
   * Page initial data
   */
  data: {
    text:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.loadLocalizedText();
  },

  loadLocalizedText() {
    // checking the phone's language and setting the text on the screen
    if (app.globalData.language === 'zh') {
      this.setData({
        text: localizationText[1].zh,
        currentLang: 'zh'
      });
    } else {
      this.setData({
        text: localizationText[1].en,
        currentLang: 'en'
      });
    }
  },
  changeLanguage: function () {
    const self = this;
    // flips the language from english to chinese and back
    if (app.globalData.language === 'zh') {
      self.setData({
        text: localizationText[1].en,
        currentLang: 'en'
      });
    } else {
      self.setData({
        text: localizationText[1].zh,
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