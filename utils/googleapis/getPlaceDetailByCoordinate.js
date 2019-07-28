import { key } from './config.js';

export default function (latitude, longitude){
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

