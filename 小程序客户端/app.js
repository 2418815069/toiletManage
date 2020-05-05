
var request = require('utils/request.js');
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    function wxLogin(func) {
      // 登录
      wx.login({
        success: function (res) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res['code'];

          wx.getUserInfo({
            success: function (info) {
              // console.log(code)
              // console.log(info)
              // console.log(info.userInfo.nickName)
              // console.log(info.userInfo.avatarUrl)
              // var rawData = info['rawData'];
              // var signature = info['signature'];
              // var encryptData = info['encryptData'];
              // var encryptedData = info['encryptedData']; //注意是encryptedData不是encryptData...坑啊
              // var iv = info['iv'];
              // console.log(encryptData)
              //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
              wx.request({
                url: request.dataUrl + "/Orchard/getOpenid",
                data: {
                  "code": code
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (arr) {
                  // console.log(arr)
                  // console.log(arr.data.data);
                  // console.log(arr.data.data);
                  wx.setStorageSync("session3rd", arr.data.data)
                  wx.setStorageSync("nickName", info.userInfo.nickName)
                  wx.setStorageSync("avatarUrl", info.userInfo.avatarUrl)
                }
              })
            }
          })
        }
      })
    }
    wxLogin()
    //检查登录是否过期
    wx.checkSession({
      success: function (e) {   //登录态未过期
        // console.log("没过期");
      },
      fail: function () {   //登录态过期了
        console.log("过期了");
        wxLogin();
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
  },
  globalData: {
    userInfo: null
  },
  getAppSysInfo: function () {
    return wx.getSystemInfoSync()
  }
})