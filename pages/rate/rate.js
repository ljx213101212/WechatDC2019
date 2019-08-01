// pages/rate/rate.js
const app = getApp();
import languageToggle from '../../utils/localization.js';
const localizationText = languageToggle();
Page({

  /**
   * Page initial data
   */
  data: {
    text: {},
    star:5,
    comment:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.loadLocalizedText();
    this.isAlreadyRated();
  },
  isAlreadyRated:function(){
    var isRated = false;
    if(true){
      isRated = true;
      this.data.text.placeHolderCommentText = "";
    }
    this.setData({
      star:4,
      isRated:true,
      comment:"Already rated!",
      text: this.data.text
    })
  },

  loadLocalizedText() {
    // checking the phone's language and setting the text on the screen
    if (app.globalData.language === 'zh') {
      this.setData({
        text: localizationText[6].zh,
        currentLang: 'zh'
      });
    } else {
      this.setData({
        text: localizationText[6].en,
        currentLang: 'en'
      });
    }
  },

  changeLanguage: function () {
    const self = this;
    // flips the language from english to chinese and back
    if (app.globalData.language === 'zh') {
      self.setData({
        text: localizationText[6].en,
        currentLang: 'en'
      });
    } else {
      self.setData({
        text: localizationText[6].zh,
        currentLang: 'zh'
      });
    }
    wx.setStorage({
      key: 'language',
      data: this.data.currentLang
    })
    app.globalData.language = this.data.currentLang;
  },

  onPressStar:function(e){
    if (e.currentTarget.id==="1") {
      this.setData({
        star:1
      })
    }else if(e.currentTarget.id ==="2"){
      this.setData({
        star: 2
      })
    }else if(e.currentTarget.id==="3"){
      this.setData({
        star: 3
      })
    }else if(e.currentTarget.id==="4"){
      this.setData({
        star: 4
      })
    }else if(e.currentTarget.id==="5"){
      this.setData({
        star: 5
      })
    }
  },

  onPressSubmitBtn:function(){

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