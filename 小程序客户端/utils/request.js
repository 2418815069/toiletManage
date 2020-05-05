var dataUrl = 'https://zgg.chuangkegf.com/index.php/Interfaces';


function request(url, params, success, fail) {
  this.requestLoading(url, params, "", success, fail)
}

function requestLoading(url, params, message, success, fail) {
  // console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    data: params,
    header: {      
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {
      
    },
  })
}


module.exports = {
  request: request,
  requestLoading: requestLoading,
  dataUrl: dataUrl
}