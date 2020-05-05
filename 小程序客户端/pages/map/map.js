// pages/map/map.js
const app = getApp();
const system = app.getAppSysInfo();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var request = require('../../utils/request.js');
var amapInstance;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value : '',
    markers: [],//标记点
    sysheigth: 350,
    latitude:'',
    longitude:'',
    polyline:[],
    animationData: 0,//动画
    callout:[],   //文本
    scale: 15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      var value = options.value;
      this.setData({
        value: value
      })
      amapInstance = new QQMapWX({
        key: 'L6FBZ-YQ4CG-URYQY-IH36I-SXRFZ-IEBI5' //此处使用你自己申请的key
        //key:'MITBZ-KTGRV-AB3PT-UCSGI-PJNZZ-WUBCJ'
      })
    // 设置地图的高度
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          },
          syshigth: res.windowHeight-40
        })
      }
    })
    // 获取当前位置
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        // 如果没有获取到经纬度，执行后面
        that.getMap();
      }
    })
    

  },  
  getMap: function(){
      var that = this;
    amapInstance.search({
      keyword: that.data.value,
      success:function(res){
        var mks = [];
        var mks1 = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i]._distance){
            mks.push({ // 获取返回结果，放到mks数组中
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "../../image/bz3.png", //图标路径
              width: 32,
              title: res.data[i].title,
              height: 44,
              callout: {
                display: 'ALWAYS',
                content: res.data[i].title
              }
            });
          }
        }
        if(mks==""){
          wx.showModal({
            title: '提示',
            content: '国内没有搜索到结果',
            success: function (res) {
              // if (res.confirm) {
              //   console.log('用户点击确定')
              // } else {
              //   console.log('用户点击取消')
              // }
            }
          })
        }
        that.setData({
          markers : mks,
        })
        that.end(mks[0].latitude,mks[0].longitude);
      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    })
  },
  // sousuoClick:function(){
  //   // that.getMap();
  //   var that = this;
  //   wx.navigateTo({
  //     url: '../map/map?value=' + that.data.value
  //   })
  // },
  // 下拉刷新回调接口
  sousuoClick() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this
    // 调取数据
    that.getMap();
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500)
  },
  //时时统计输入到文本框的字符数
  texts_num: function (e) {
    //每一次触发事件都要给出提交按钮的状态标志
    this.setData({
      value: e.detail.value,
    })
  },
  //路径生成函数
  end: function (lat, lon) {
    var coors;
    var that = this;
    wx.request({
      url: 'https://apis.map.qq.com/ws/direction/v1/walking/?from=' + that.data.latitude + ',' + that.data.longitude + '&to=' + lat + ',' + lon + '&output=json&callback=cb&key=22VBZ-REEK5-WVSI7-QKCOP-QPM6E-W7BPO',
      success: function (res) {
        coors = res.data.result.routes[0].polyline;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000
        }
        //console.log(coors);
        var b = [];
        b[0] = {
          latitude: that.data.latitude,
          longitude: that.data.longitude
        }
        for (var i = 0; i < coors.length; i = i + 2) {
          b[(i / 2) + 1] = {
            latitude: coors[i],
            longitude: coors[i + 1]
          }
          //     console.log(b[i / 2])
        }
        b[b.length] = {
          latitude: lat,
          longitude: lon
        }
        // console.log(b.length);
        that.setData({
          polyline: [{
            points: b,
            color: "#40bfff",
            width: 4,
            dottedLine: false
          }],
        })

      }
    })
  },
  markertap:function(e){
    var that = this;
    for(var i = 0; i < e.target.dataset.id.length;i++){
      if (e.markerId == e.target.dataset.id[i].id){
        that.end(e.target.dataset.id[i].latitude, e.target.dataset.id[i].longitude);
        wx.openLocation({
          latitude: e.target.dataset.id[i].latitude,
          longitude: e.target.dataset.id[i].longitude,
          address: e.target.dataset.id[i].title,
          scale: 15
        })
      }
    }
  
  },
  //点击页面刷新地图
  stapadd: function () {
    var that = this;
    //改变动画标志位
    this.setData({
      animationData: 1//动画开始
    })
    // 获取当前位置
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 15,
          animationData: 0//结束动画
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})