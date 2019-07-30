function language_toggle() {
  let addAddress = {
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

  let deliveryConfirm = {
    zh: {
      title: '确认订单',
      deliveryAddress: '送货地址',
      orderDetails: '订单详情',
      editOrder: '编辑订单',
      paymentMethod: '支付方式',
      wechatPay: '微信支付',
      useRewards: '使用奖励',
      available: '个可用',
      total: '总计：',
      pay: '确认支付',
      remove: '取消',
      deliveryFee: '派送费'
    },
    en: {
      title: 'Confirm Order',
      deliveryAddress: 'Delivery Address',
      orderDetails: 'Order Details',
      editOrder: 'Edit order',
      paymentMethod: 'Payment Method',
      wechatPay: 'WeChat Pay',
      useRewards: 'Use Rewards',
      available: ' available',
      total: 'Total:',
      pay: 'Pay',
      remove: 'Remove',
      deliveryFee: 'Delivery Fee'
    }
  }

  return [addAddress, deliveryConfirm];
}

export default function languageToggle() {
  return language_toggle();
}

// Example:
//
// import languageOptionsToggle from '../../utils/localization.js';
// let text = languageOptionsToggle()
// console.log(text);