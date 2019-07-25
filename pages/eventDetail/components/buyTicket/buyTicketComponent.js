// pages/eventDetail/components/buyTicket/buyTicketComponent.js
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
    }
  }
  
})
