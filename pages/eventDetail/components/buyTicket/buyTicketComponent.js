// pages/eventDetail/components/buyTicket/buyTicketComponent.js
const db = wx.cloud.database()
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
   * @example
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
  
  properties: {
    pageData:Object
  },

  /**
   * Component initial data
   */
  data: {
  },

  /**
   * Component methods
   */
  methods: {
    onPressBuyBtn: function (e) {

      let currEventId = this.data.pageData.id;
      let currUserOpenId = wx.getStorageSync('openid');
      let nextPageData = {
         currEventId: currEventId,
         currUserOpenId: currUserOpenId
      }
      let nextPageDataPassenger = JSON.stringify(nextPageData);
      wx.navigateTo({
        url: `/pages/selectAddress/selectAddress`,
        event:{
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function (data) {
              console.log(data)
            },
            someEvent: function (data) {
              console.log(data)
            }
        },
        success: function(res){
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: nextPageDataPassenger })
        }
      });

      // wx.navigateTo({
      //   url: `/pages/eventDetail/eventDetail?eventId=${eventId}`,
      //     events: {
      //       // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //       acceptDataFromOpenedPage: function (data) {
      //         console.log(data)
      //       },
      //       someEvent: function (data) {
      //         console.log(data)
      //       }
      //    },
      //   success: function (res) {
      //     // 通过eventChannel向被打开页面传送数据
      //     res.eventChannel.emit('acceptDataFromOpenerPage', { data: eventOriginPassenger })
      //   }
      // });
    },
    onPressLiked: function (e) {
      this.data.pageData.liked = !this.data.pageData.liked
      this.setData({
        pageData: this.data.pageData
      })
      this.updateLikeEvents(this.data.pageData, wx.getStorageSync("openid"));
    },
    updateLikeEvents:function(event, openid){
      const self = this;
      db.collection("User_LikeEvents").where({ activeId: event.activeId, _openid: openid}).get().then(res => {
        if(res.data.length>0){
          res.data[0].liked = self.data.pageData.liked;
          db.collection("User_LikeEvents").doc(res.data[0]._id).update({
            data: {
              liked: self.data.pageData.liked
            }
          }).then().catch(console.error)
        }else{
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

    onNavigateToRestaurantPage: function (e) {
      /**
       * @see https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
       */
      wx.navigateTo({
        url: `/pages/restaurantRecommendation/index`,
        // events: {
        //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        //   acceptDataFromOpenedPage: function (data) {
        //     console.log(data)
        //   },
        //   someEvent: function (data) {
        //     console.log(data)
        //   }
        // },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          // res.eventChannel.emit('acceptDataFromOpenerPage', { data: eventOriginPassenger })
        }
      });
    }

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
