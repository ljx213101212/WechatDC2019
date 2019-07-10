
/** 
 * 
 * 
 * 
 * 
 */

function list_attractions_types() {
  let url = 'https://tih-api.stb.gov.sg/content/v1/attractions/types?apikey=SJnO6lGuhYLfn3VjOejbSLgvljFZ0sM1&language=zh-cn';
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

export default function listAttractionsTypes() {
  return list_attractions_types();
}

// Example:
//
// import listAttractionsTypes from '../../utils/tih_api/listAttractionsTypes.js';
// listAttractionsTypes().then(res => {
//   console.log("listAttractionsTypes:", res);
// })