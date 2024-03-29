function language_toggle() {
  let home = {
    zh: {
      recentEvents: '近期活动',
      all: '全部',
      today: '今天',
      tomorrow: '明天',
      this_week: '本周',
      next_week: '下周',
      recommendations: '为您推荐',
      find_nearby_restaurants: '查找附近的餐厅',
      no_recommendation: '不能为您找到推荐的活动'
    },
    en: {
      recentEvents: 'Recent Events',
      all: 'All',
      today: 'Today',
      tomorrow: 'Tomorrow',
      this_week: 'This Week',
      next_week: 'Next Week',
      recommendations: 'Recommendations',
      find_nearby_restaurants: 'Nearby',
      no_recommendation: 'We can\'t find any match'
    }
  }

  let assistant = {
    zh: {
      smart_assistant: '点击下方按钮进入智能助手',
      smart_assistant_btn: '智能助手',
      smart_assistant_text1: '1. 在智能助手中识别二维码添加好友“新展汇机器人”',
      smart_assistant_text2:'2. 回复关键字到“新展汇机器人”自动加入活动群',
      smart_assistant_text3:'3. 欢迎使用智能助手，并认识您的新朋友吧！'
    },
    en: {
      smart_assistant: 'Click the button below to use smart assistant.',
      smart_assistant_btn: 'Smart Assistant',
      smart_assistant_text1: '1. Long press the QR Code in the smart assistant to add SACEOS Robot.',
      smart_assistant_text2:'2. Reply to SACEOS Robot event keyword to join event group chat.',
      smart_assistant_text3:'3. Welcome! Get started to meet new friends!'
    }
  }

  let eventAdmin = {
    zh: {
      open_registration: '开放报名', 
      registration_list: '报名列表',
      scan_code: '扫码检票'
    },
    en: {
      open_registration: 'Open registration',
      registration_list: 'Registration list',
      scan_code: 'Scan Code'
    }
  }

  let eventDetail = {
    zh: {
      onSale: '售票中',
      salesStopped: 'Sales Stopped',
      eventInfo: '演出信息',
      ticketInfo:'售票信息',
      ticketPrice:"票价",
      wechatPayOnly:"可以微信支付",
      pay:"立即支付",
      bought:"已购买",
    },
    en: {
      onSale: 'On Sale',
      salesStopped: 'Sales Stopped',
      eventInfo:'Event Information',
      ticketInfo: 'Ticket Information',
      ticketPrice: "Price",
      wechatPayOnly:"WeChat Pay Only",
      pay: "Pay",
      bought: "Paid",
    }
  }

  let me = {
    zh: {
      WeChatLogin: '微信登录',
      loyaltyPoints: '积分',
      likedEvents:'想看的演出',
      RegisteredEvents:'注册的演出',
      RateEvents:'待评价的演出',
      Notifications:'通知',
      myOrders:'我的订单',
      myTickets:'我的票',
      myAddress:'常用地址',
      myCoupons:'优惠券',
      IamOrganizer:'我是组织方',
    },
    en: {
      WeChatLogin: 'WeChat Login',
      loyaltyPoints: 'Points',
      likedEvents: 'Liked Events',
      RegisteredEvents: 'My Events',
      RateEvents: 'Rate Events',
      Notifications: 'Notifications',
      myOrders: 'My Orders',
      myTickets: 'My Tickets',
      myAddress: 'My Addresses',
      myCoupons: 'My Coupons',
      IamOrganizer: 'I Am Organizer',
    }
  }

  //index 5
  let selectAddress = {
    zh:{
       addressUserName:"姓名",
       addressUserPhone:"联系方式",
       addressUserAddress: "地址",
       addressUserNameErrorTips:"姓名不能为空",
       addressUserPhoneErrorTips: "请填写正确的手机号码格式",
       addressUserAddressErrorTips: "地址不能为空",
       addAddress:"添加地址",
       payByWechat:"微信支付",
       addSuccess: "添加成功",
       addError: "添加失败",
       Info:"提示"
    },
    en:{
      addressUserName: "Name",
      addressUserPhone: "Contact Number",
      addressUserAddress: "Address",
      addressUserNameErrorTips:"Please fill the name",
      addressUserPhoneErrorTips: "Please input the phone number in correct format",
      addressUserAddressErrorTips: "Please fill the address",
      addAddress:"Add new address",
      payByWechat:"Pay By Wechat",
      addSuccess: "New Address Created!",
      addError: "Add Address Failed!",
      Info:"Info"
    }
  }
  //index 6
  let rate = {
    zh:{
      pleaseRateText:"请给该活动打分:",
      submitText:"提交",
      placeHolderCommentText:"写一点您的想法吧!"

    },
    en: { 
      pleaseRateText:"Please rate the event:",
      submitText:"Submit",
      placeHolderCommentText: "Please give some comments!"
    }
  }
  //index 7
  let my_rate = {
    zh: {
      my_rate_title: "选择您想评分的活动"

    },
    en: {
      my_rate_title: "Please select the event."
    }
  }
  //index 8
  let organizerHome = {
    zh: {
      myResponsibleEvents: "我负责的活动"

    },
    en: {
      myResponsibleEvents: "My Responsible Events"
    }
  }

  return [home, assistant, eventAdmin, eventDetail, me, selectAddress, rate, my_rate, organizerHome];
}

export default function languageToggle() {
  return language_toggle();
}

// Example:
//
// import languageOptionsToggle from '../../utils/localization.js';
// let text = languageOptionsToggle()
// console.log(text);