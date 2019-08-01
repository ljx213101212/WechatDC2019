import { key } from './config.js';

export default function (latitude, longitude){
  latitude = latitude.toFixed(4);
  longitude = longitude.toFixed(4);
  let url = `https://maps.googleapis.com/maps/api/geocode/json?result_type=street_address&latlng=${latitude},${longitude}&key=${key}`;

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

