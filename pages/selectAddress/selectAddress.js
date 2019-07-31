// pages/selectAddress/selectAddress.js
const Util = require('../../utils/util');
const app = getApp();
import languageToggle from '../../utils/localization.js';
const localizationText = languageToggle();
import AddressModel from '../../utils/models/Address';
const UserService = require('../../utils/service/UserService');

Page({

  /**
   * Page initial data
   */
  data: {
    /**
     * PageData
     * userName,
     * userPhone,
     * userAddress,
     * userNameErrorTips,
     * userPhoneErrorTips,
     * userAddressTips
     */
    pageData:{},
    paymentPassenger:null,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

     //加载翻译信息
     this.loadLocalizedText();
     const eventChannel = this.getOpenerEventChannel();
     //接受父页面传过来的值
     let self = this;
     eventChannel.on('acceptDataFromOpenerPage', function(nextPageDataPassenger) {
       if (nextPageDataPassenger){
        console.log("哦耶，我接受到了上一个页面传过来的超长字符串",nextPageDataPassenger);
        self.setData({
          paymentPassenger: nextPageDataPassenger
        })
       }else{
         console.log("木有收到任何父页面数据");
       }
     
     })
     //向父页面回传数据
     eventChannel.emit('acceptDataFromOpenedPage', {data: '这是从eventDetail 传回来的数据, 我是 acceptDataFromOpenedPage'});
     eventChannel.emit('someEvent', {data: '这是从eventDetail 传回来的数据，我是some Event'});

    //系统选择地址
    wx.chooseAddress({
      success(res) {
        /**
         * @example
         * console.log(res.userName)
         * console.log(res.postalCode)
         * console.log(res.provinceName)
         * console.log(res.cityName)
         * console.log(res.countyName)
         * console.log(res.detailInfo)
         * console.log(res.nationalCode)
         * console.log(res.telNumber)
         */
        console.log("用户使用了系统自带的选择地址功能");
        //把回调函数的数据填充至页面.
        let pageData = {
            userName: res.userName,
            userPhone: res.telNumber,
            userAddress: Util.getAddressByChooseAddressCallBack(res)
        }
        self.setData({
          pageData: pageData
        })
      },
      fail(){
        console.log("用户点击了取消使用系统的选择地址");
        //强行让用户填写收获地址，否则不允许支付
      }
    })

    
  },
  onPressBuyBtn:function(e){
    wx.navigateTo({
      url: '/pages/successPay/successPay',
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

  },

  changeLanguage: function () {
    const self = this;
    // flips the language from english to chinese and back
    if (app.globalData.language === 'zh') {
      self.setData({
        text: localizationText[5].en,
        currentLang: 'en'
      });
    } else {
      self.setData({
        text: localizationText[5].zh,
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
        text: localizationText[5].zh,
        currentLang: 'zh'
      });
    } else {
      this.setData({
        text: localizationText[5].en,
        currentLang: 'en'
      });
    }
  },

  /**
   * 正则验证输入框: AddressName
   * @example
   * e.detail.value = 李技强
   */
  bindAddressName:function(e){
    //如果人名不满足验证条件
    let currTips = "";
    if (!Util.humanNameRegexValidation(e.detail.value)){
       //显示tips
       currTips = this.data.text.addressUserNameErrorTips
    }
    this.setData({
      ["pageData.userNameErrorTips"]: currTips,
      ["pageData.userName"]:e.detail.value
     })
  },

  /**
   * 正则验证输入框: bindAddressPhone
   * @example
   * e.detail.value = 110
   */
  bindAddressPhone:function(e){
     //如果地址名不满足验证条件
    let currTips = "";
    if (!Util.phoneNumberValidation(e.detail.value)) {
      //显示tips
      currTips = this.data.text.addressUserPhoneErrorTips;
    }
    this.setData({
      ["pageData.userPhoneErrorTips"]: currTips,
      ["pageData.userPhone"]:e.detail.value
    })
    console.log(this.data.pageData);
  },

  /**
   * 正则验证输入框: bindAddressAddress
   * @example
   * e.detail.value = 上海市浦东新区汤臣一品保安室
   */
  bindAddressAddress:function(e){
    let currTips = "";
    if(!Util.addressValidation(e.detail.value)){
      //显示tips
      currTips = this.data.text.addressUserAddressErrorTips
    }
    this.setData({
      ["pageData.userAddressTips"]: currTips,
      ["pageData.userAddress"]:e.detail.value
    })
  },

  bulkAddressFormValidation:function(){
    if (Util.humanNameRegexValidation(this.data.pageData.userName)
     && Util.phoneNumberValidation(this.data.pageData.userPhone)
     && Util.addressValidation(this.data.pageData.userAddress)){
         return true;
     }else{
       return false;
     }
  },

  onAddAddress:function(e){
    //1.验证表单
    if(this.bulkAddressFormValidation()){
      //验证通过
      console.log("地址表单验证通过");
      //存入云数据库
      //addressName,addressPersonName,addressPhone,openId
      let addressModel = new AddressModel(this.data.pageData.userAddress,this.data.pageData.userName,this.data.pageData.userPhone,wx.getStorageSync('openid'));
      console.log(addressModel.dbModel);
      UserService.setNewCustomAddress(addressModel.dbModel).then(
        (data)=>{
           console.log("新地址表单已经插入数据库", data._id ,data.stats);
      }).catch((err)=>{
          console.log("新地址表单插入数据库失败", err);
      });

    }else{
      console.log("地址表单验证失败");
    }
  }
})