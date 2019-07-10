

function list_shops_types() {
  let url = 'https://tih-api.stb.gov.sg/content/v1/shops/types?apikey=SJnO6lGuhYLfn3VjOejbSLgvljFZ0sM1&language=zh-cn';
  return new Promise(function (resolve) {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        resolve(res.data)
      }
    })
  })
}

export default function listShopsTypes() {
  return list_shops_types();
}

// Example:
//
// import listShopsTypes from '../../utils/tih_api/listShopsTypes.js';
// listShopsTypes().then(res => {
//   console.log("listShopsTypes:", res);
// })