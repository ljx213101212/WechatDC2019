// pages/eventDetail/components/purchasedTicket/purchasedTicketComponent.js
const app = getApp();
import languageToggle from '../../../../utils/localization.js';
const localizationText = languageToggle();
Component({

  /**
 * @see https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html
 */
  options: {
    addGlobalClass: true,
  },
  /**
   * Component properties
   */
  properties: {
  },

  /**
   * Component initial data
   */
  data: {
    liked:false
  },

  /**
   * Component methods
   */
  methods: {
    onPressLiked: function (e) {
      this.data.pageData.liked = !this.data.pageData.liked
      this.setData({
        pageData: this.data.pageData
      })
      this.updateLikeEvents(this.data.pageData, wx.getStorageSync("openid"));
    },
    updateLikeEvents: function (event, openid) {
      const self = this;
      db.collection("User_LikeEvents").where({ activeId: event.activeId, _openid: openid }).get().then(res => {
        if (res.data.length > 0) {
          res.data[0].liked = self.data.pageData.liked;
          db.collection("User_LikeEvents").doc(res.data[0]._id).update({
            data: {
              liked: self.data.pageData.liked
            }
          }).then().catch(console.error)
        } else {
          self.data.pageData.liked = self.data.pageData.liked;
          db.collection('User_LikeEvents').add({
            data: self.data.pageData
          }).then().catch(console.error)
        }
      })
    },
    changeLanguage: function () {
      const self = this;
      // flips the language from english to chinese and back
      if (app.globalData.language === 'zh') {
        self.setData({
          text: localizationText[3].en,
          currentLang: 'en'
        });
      } else {
        self.setData({
          text: localizationText[3].zh,
          currentLang: 'zh'
        });
      }
      wx.setStorage({
        key: 'language',
        data: this.data.currentLang
      })
      app.globalData.language = this.data.currentLang;
    },
    loadLocalizedText() {
      // checking the phone's language and setting the text on the screen
      if (app.globalData.language === 'zh') {
        this.setData({
          text: localizationText[3].zh,
          currentLang: 'zh'
        });
      } else {
        this.setData({
          text: localizationText[3].en,
          currentLang: 'en'
        });
      }
    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.loadLocalizedText();
    },
    hide: function () { },
    resize: function () { },
  },
})
