
import {key} from './config.js';

export default function(text) {
  let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${text}&inputtype=textquery&key=${key}`;
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
