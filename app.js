//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log("hello world")
    wx.cloud.init()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.cloud.callFunction({
            name: 'login',
            complete: res => {
              console.log("openid", res.result.openid);
              wx.setStorageSync("openid", res.result.openid)
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // checks if language settings are stored in the phone, checks phone language if none exists.
    wx.getStorage({
      key: 'language',
      success: res => {
        self.globalData.language = res.data;
      },
      complete: () => {
        if (!self.globalData.language) {
          wx.getSystemInfo({
            success: function (res) {
              self.globalData.language = res.language;
              wx.setStorage({
                key: 'language',
                data: self.globalData.language
              })
            },
          });
        }
      }
    });
  },
  onShow(options) {
    // Do something when show.
    console.log("onShowCalled");
  },
  onHide() {
    // Do something when hide.
    console.log("onHideCalled");
  },
  onError(msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null
  }
})