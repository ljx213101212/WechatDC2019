
/** 
 * 
 * 
 * 
 * 
 */

function get_bars_clubs_types() {
  let url = 'https://tih-api.stb.gov.sg/content/v1/bars-clubs/types?apikey=SJnO6lGuhYLfn3VjOejbSLgvljFZ0sM1&language=zh-cn';
  return new Promise(function (resolve){
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

export default function getBarsClubsTypes() {
  return get_bars_clubs_types();
}

// Example:
//
// import getBarsClubsTypes from '../../utils/tih_api/getBarsClubsTypes.js';
// getBarsClubsTypes().then(res => {
//   console.log("getBarsClubsTypes:", res);
// })