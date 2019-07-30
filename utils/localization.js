function language_toggle() {
  let home = {
    zh: {
      recentEvents: '近期活动',
      all: '全部',
      today: '今天',
      tomorrow: '明天',
      this_week: '本周',
      next_week: '下周/以后',
      recommendations: '为您推荐',
      find_nearby_restaurants: '查找附近的餐厅'
    },
    en: {
      recentEvents: 'Recent Events',
      all: 'All',
      today: 'Today',
      tomorrow: 'Tomorrow',
      this_week: 'This Week',
      next_week: 'Next Week/Later',
      recommendations: 'Recommendations',
      find_nearby_restaurants: 'Restaurants Nearby'
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

  return [home, assistant];
}

export default function languageToggle() {
  return language_toggle();
}

// Example:
//
// import languageOptionsToggle from '../../utils/localization.js';
// let text = languageOptionsToggle()
// console.log(text);