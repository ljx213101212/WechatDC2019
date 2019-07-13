
/** 
 * 
 * 
 * 
 * 
 */

function list_event_types() {
  let url = 'https://tih-api.stb.gov.sg/content/v1/event/types?apikey=SJnO6lGuhYLfn3VjOejbSLgvljFZ0sM1&language=zh-cn';
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

export default function listEventTypes() {
  return list_event_types();
}

// Example:
//
// import listEventTypes from '../../utils/tih_api/listEventTypes.js';
// listEventTypes().then(res => {
//   console.log("listEventTypes:", res);
// })