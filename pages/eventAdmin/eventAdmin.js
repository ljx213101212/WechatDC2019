// pages/eventAdmin/eventAdmin.js
const app = getApp();
import languageToggle from '../../utils/localization.js';
const localizationText = languageToggle();
const db = wx.cloud.database();
Page({

  /**
   * Page initial data
   */
  data: {

  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
  },
  onPressQRCheckIn:function(){
    const self = this;
    wx.scanCode({
      success(res) {
        var openid = res.result.split('*')[0];
        var eventid = res.result.split('*')[1];
        self.checkIn(openid, eventid);
      }
    })
  },
  onPressRegistrationList:function(){
    wx.navigateTo({
      url: '/pages/registrationList/registrationList',
    })
  },
  checkIn:function(openid, eventid){
    db.collection('Event_Registration').where({
      openid: openid,
      eventUuid: "004666261d592ff4c9a86e1b57e206f7f3b",
    }).get({
      success: function (res) {
        var record = res.data[0];
        console.log(res);
        db.collection('Event_Registration').doc(record._id).update({
          // data 传入需要局部更新的数据
          data: {
            checkedIn: true
          },
          success: console.log,
          fail: console.error
        })
      }
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e)
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'sendTemplateMessage',
      data: {
        formId: e.detail.formId,
        toUser: wx.getStorageSync("openid")
      },
      complete: res => {
        console.log("sendTemplateMessage", res.result);
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
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
        text: localizationText[2].zh,
        currentLang: 'zh'
      });
    } else {
      this.setData({
        text: localizationText[2].en,
        currentLang: 'en'
      });
    }
  },
  changeLanguage: function () {
    const self = this;
    // flips the language from english to chinese and back
    if (app.globalData.language === 'zh') {
      self.setData({
        text: localizationText[2].en,
        currentLang: 'en'
      });
    } else {
      self.setData({
        text: localizationText[2].zh,
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