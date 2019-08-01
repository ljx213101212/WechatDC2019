// pages/rate/rate.js
const app = getApp();
import languageToggle from '../../utils/localization.js';
const localizationText = languageToggle();
const db = wx.cloud.database();

Page({

  /**
   * Page initial data
   */
  data: {
    text: {},
    star:5,
    comment:"",
    isRated:false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setStorageSync("eventId", options.eventId);
    this.loadLocalizedText();
    db.collection("User_Rate").where({ openId: wx.getStorageSync("openid"), eventId: options.eventId }).get().then(res => {
      if(res.data.length>0){
        this.isAlreadyRated(res.data[0]);
      }else{
      }
    })
  },
  isAlreadyRated:function(data){
    this.data.text.placeHolderCommentText = "";
    this.setData({
      star:data.rate,
      isRated:true,
      comment: data.comment,
      text: this.data.text
    })
  },
  bindTextAreaInput:function(e){
    this.setData({
      comment:e.detail.value
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
    const self = this;
    var data = { openId: wx.getStorageSync("openid"), rate: self.data.star, comment: self.data.comment,eventId:wx.getStorageSync("eventId")}
    db.collection("User_Rate").add({
      data: data
    }).then(res => {
      db.collection("User_Rate").where({ openId: wx.getStorageSync("openid"), eventId: options.eventId }).get().then(res => {
        if (res.data.length > 0) {
          self.isAlreadyRated(res.data[0]);
        } else {
        }
      })
      https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ovZ7N4rSInGTOT6uDWT-MyzL3ooo*5d326d71c568aa683323105e
      db.collection("Orders").where({ openId: wx.getStorageSync("openid"), eventId: wx.getStorageSync("eventId") }).get().then(res => {
        db.collection("Orders").doc(res.data[0]._id).update({
          data:{
            rated:true
          },
          success: console.log,
          fail: console.error
        })
      })
    })
      .catch(console.error)
    wx.showModal({
      title:"Success!"
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