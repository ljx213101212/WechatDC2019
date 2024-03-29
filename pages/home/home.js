// pages/home/home.js
const EventService = require('../../utils/service/EventService');
const UserService = require('../../utils/service/UserService');
const RecommendationService = require('../../utils/service/RecommendationService');
const Util = require('../../utils/util');
const COLLECTION_NAME = "Event";
const app = getApp();
import languageToggle from '../../utils/localization.js';
const localizationText = languageToggle();
Page({

  /**
   * Page initial data
   */
  data: {
    imgSwiperUrls: [
      'https://s3-ap-southeast-1.amazonaws.com/saceos/files/rAjpdogCei.jpeg',
      'https://tih-api.stb.gov.sg/media/v1/download/uuid/101f6712129e9154639870adaa47195c2b0?apikey=SJnO6lGuhYLfn3VjOejbSLgvljFZ0sM1',
      'https://s3-ap-southeast-1.amazonaws.com/saceos/files/MIqzUf5RtM.jpeg'
    ],
    recentEvents: [],
    filteredRecentEvents: [],
    recentEventsFilterSelecteText: [true, false, false, false, false],
    recommendedEvents: [],
    isRecommendationLoading: true,
    text: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.loadLocalizedText();
  },

  loadLocalizedText() {
    // checking the phone's language and setting the text on the screen
    if (app.globalData.language === 'zh') {
      this.setData({
        text: localizationText[0].zh,
        currentLang: 'zh'
      });
    } else {
      this.setData({
        text: localizationText[0].en,
        currentLang: 'en'
      });
    }
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {
    try {
      //从云数据库拿event 数据填充当前页面数据
      const db = wx.cloud.database()
      db.collection(COLLECTION_NAME).get().then(res => {
        console.log(res.data);
        //preprocessing data.
        let processedData = EventService.preProcessingEventData(res.data);
        console.log(processedData);
        this.setData({
          recentEvents: processedData,
          filteredRecentEvents: processedData
        });

        //读当前用户购买过的Order,来看这些order 属于什么类型.
        //从缓存当中拿取openid.
        let currUserOpenId = wx.getStorageSync('openid');
        UserService.getCurrUserBoughtEvents(currUserOpenId).then((currUserBoughtEvents) => {
          console.log("当前用户已经购买了如下events",currUserBoughtEvents);
          let counter = {};
          currUserBoughtEvents.map((item, index) => {
            if (!counter.hasOwnProperty(item.type)) {
              counter[item.type] = 0;
            }
            counter[item.type] += 1;
          });
          let sortedArray = Util.sortProperties(counter);
          let sortedTypes = sortedArray.map(item => {
            return item[0];
          });
          //进行推荐.
          let recommendationEvents = RecommendationService.getRecommendedEvents(processedData, sortedTypes);
          console.log("final anwser ,superb! man", recommendationEvents);
          this.setData({
            isRecommendationLoading: false,
            recommendedEvents: recommendationEvents
          });
        }).catch(() => {
          let randomEvents = EventService.getRandomEvents(processedData, 3);
          this.setData({
            isRecommendationLoading: false,
            recommendedEvents: randomEvents
          });
        });
      });
    } catch (err) {
      let randomEvents = EventService.getRandomEvents(processedData, 3);
      this.setData({
        isRecommendationLoading: false,
        recommendedEvents: randomEvents
      });
    }
   
  },
  changeLanguage: function() {
    const self = this;
    // flips the language from english to chinese and back
    if (app.globalData.language === 'zh') {
      self.setData({
        text: localizationText[0].en,
        currentLang: 'en'
      });
    } else {
      self.setData({
        text: localizationText[0].zh,
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
   * Lifecycle function--Called when page show
   */
  onShow: function() {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  onNavigateToEventDetailPage: function(e) {
    let eventId = e.currentTarget.id;
    let eventOrigin = e.currentTarget.dataset.origin;
    let eventOriginPassenger = "{}";
    try {
      eventOriginPassenger = JSON.stringify(eventOrigin);
    } catch (e) {
      console.log(e);
    }
    wx.setStorageSync('eventOriginSnapshotJsonStr', eventOriginPassenger);
    /**
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
     */
    wx.navigateTo({
      url: `/pages/eventDetail/eventDetail?eventId=${eventId}`,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: eventOriginPassenger
        })
      }
    });
  },

  onClickAll: function(e) {
    this.setData({
      filteredRecentEvents: this.data.recentEvents,
      recentEventsFilterSelecteText: [true, false, false, false, false]
    });
  },

  onClickToday: function(e) {
    //filter recentEvents -> today only.
    let filteredEvents = EventService.filterEvent(this.data.recentEvents, Util.constants.TODAY);
    this.setData({
      filteredRecentEvents: filteredEvents,
      recentEventsFilterSelecteText: [false, true, false, false, false]
    });
  },

  onClickTomorrow: function(e) {
    let filteredEvents = EventService.filterEvent(this.data.recentEvents, Util.constants.TOMORROW);
    this.setData({
      filteredRecentEvents: filteredEvents,
      recentEventsFilterSelecteText: [false, false, true, false, false]
    });
  },

  onClickThisWeek: function(e) {
    let filteredEvents = EventService.filterEvent(this.data.recentEvents, Util.constants.THIS_WEEK);
    this.setData({
      filteredRecentEvents: filteredEvents,
      recentEventsFilterSelecteText: [false, false, false, true, false]
    });
  },

  onClickNextWeek: function(e) {
    let filteredEvents = EventService.filterEvent(this.data.recentEvents, Util.constants.NEXT_WEEK);
    this.setData({
      filteredRecentEvents: filteredEvents,
      recentEventsFilterSelecteText: [false, false, false, false, true]
    });
  },


  onNavigateToRestaurantPage: function(e) {
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
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: eventOriginPassenger })
      }
    });
  }


})