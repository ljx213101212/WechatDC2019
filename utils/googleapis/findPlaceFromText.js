
/** 
 * 
 * 
 * 
 * 
 */

function find_place_from_text(text) {
  let url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + text +'&inputtype=textquery&key=AIzaSyD0LvrXWXz5pwznGHNaqtFCq3K9eNmtkYk';
  return new Promise(function (resolve) {
    wx.request({
      url: url,
      header: {},
      success(res) {
        resolve(res.data)
      }
    })
  })
}

export default function findPlaceFromText(text) {
  return find_place_from_text(text);
}

// Example:
//
// import findPlaceFromText from '../../utils/googleapis/findPlaceFromText.js';
// findPlaceFromText('NUS').then(res => {
//   console.log("findPlaceFromText:", res);
// })