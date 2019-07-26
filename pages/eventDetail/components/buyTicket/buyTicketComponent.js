// pages/eventDetail/components/buyTicket/buyTicketComponent.js
const db = wx.cloud.database()

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
      wx.navigateTo({
        url: `/pages/selectAddress/selectAddress`,
      });
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
    }

  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {

    },
    hide: function () { },
    resize: function () { },
  },
  
})
