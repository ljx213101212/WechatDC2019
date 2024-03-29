
/** 
 * 
 * 
 * 
 * 
 */
import {key} from './config.js';
function near_by_search(lat, lng, radius,type) {
  let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${key}`;
  console.log(url);
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

export default function s(lat, lng, radius = 1500,type = 'restaurant') {
  return near_by_search(lat, lng, radius, type);
}

// Example:
//
// import nearBySearch from '../../utils/googleapis/nearBySearch.js';
// nearBySearch('1.3028539','103.772739','1000','lodging').then(res => {
//   console.log("nearBySearch:", res);
// })