// pages/successPay/successPay.js
const OrderPaymentService = require('../../utils/service/OrderPaymentService');
const UserService = require('../../utils/service/UserService');

Page({

  /**
   * Page initial data
   */
  data: {
     /**
      * currEventId
      * currUserOpenId
      */
      paymentObj:{}
  },
  onPressHomeBtn:function(){
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    //加载翻译信息
    //this.loadLocalizedText();
    const eventChannel = this.getOpenerEventChannel();
    //接受父页面传过来的值
    let self = this;
    eventChannel.on('acceptDataFromOpenerPage', function(nextPageDataPassenger) {
      /**
       * paymentObj
       * currEventId: currEventId,
       * currUserOpenId: currUserOpenId
       */
      if (nextPageDataPassenger){
       console.log("从select Address 页面传来jsonString数据",nextPageDataPassenger);
          try{
            let paymentObj = JSON.parse(nextPageDataPassenger.data);
            let validationResult = self.paymentObjValidation(paymentObj.currEventId,paymentObj.currUserOpenId);
            if (validationResult){
              //可以入数据库了
              console.log(`EventId: ${paymentObj.currEventId} 和 OpenId: ${paymentObj.currUserOpenId} 符合验证要求， 可以入库`);
              let promises = [];
              //向Order数据库里插入数据
              let insertOrderPromise = OrderPaymentService.getNewOrderInDbModel(paymentObj.currEventId, paymentObj.currUserOpenId)
              .then((newOrderInDbModel)=>{   
                  return OrderPaymentService.generateNewOrder(newOrderInDbModel)
                  .then((res)=>{
                    return true;
                  })
                  .catch(err=>{
                    console.log(err);
                    return false;
                  });
              })
              .catch(err=>{
                console.log("Success Pay page 没有拿到 NewOrderInDbModel", JSON.stringify(err));
              });
              //向Order数据库里插入数据
              let setNewOrderInOrderListPromise = UserService.setNewOrderInOrderList(paymentObj.currEventId).then(res=>{
                    return true;
              }).catch(err=>{
                  return false;
              });
              promises.push(insertOrderPromise);
              promises.push(setNewOrderInOrderListPromise);
              Promise.all(promises).then((successArray)=>{
                  let res = true;
                  successArray.map(item=>{
                      if (!item){
                        res = false;
                      }
                  });
                  if (res){
                    //插入new order 数据成功
                    //弹出modal
                    wx.showToast({
                      title: '付款成功',
                      icon: 'success',
                      duration: 2000
                    });
                  }else{
                    //   插入new order 数据失败
                    // 弹出modal 提示
                    wx.showToast({
                      title: '付款失败',
                      icon: 'cancel',
                      duration: 2000
                    });
                  }
              }).catch(err=>{
                console.log(err);
              })
            }else{
              console.log(`EventId: ${paymentObj.currEventId} 和 OpenId: ${paymentObj.currUserOpenId} 不满足验证要求， 不可以入库`);
            }
            self.setData({
              paymentObj: paymentObj
            })
          }catch(err){
            console.log(err);
          }
      }else{
        console.log("木有收到任何父页面数据");
      }
    
    })
    //向父页面回传数据
    eventChannel.emit('acceptDataFromOpenedPage', {data: '这是从eventDetail 传回来的数据, 我是 acceptDataFromOpenedPage'});
    eventChannel.emit('someEvent', {data: '这是从eventDetail 传回来的数据，我是some Event'});
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

  },

  /**
   *  入数据库前的判断
   */
    paymentObjValidation:function(eventId, openId){
    if ((typeof eventId !== "undefined " && eventId !== "")
        && (typeof openId !== "undefined" && openId !== "")){
           return true;
        }else{
          return false;
        }
  }
})