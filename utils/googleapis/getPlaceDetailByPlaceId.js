
/** 
 * 
 * 
 * 
 * 
 */

function get_place_detail_by_placeid(placeid) {
  let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeid +'&fields=name,rating,formatted_phone_number&key=AIzaSyD0LvrXWXz5pwznGHNaqtFCq3K9eNmtkYk';
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

export default function getPlaceDetailByPlaceId(placeid) {
  return get_place_detail_by_placeid(placeid);
}

// Example:
//
// import getPlaceDetailByPlaceId from '../../utils/googleapis/getPlaceDetailByPlaceId.js';
// getPlaceDetailByPlaceId('ChIJ2QJCeFYa2jERa434wdYIjUg').then(res => {
//   console.log("getPlaceDetailByPlaceId:", res);
// })