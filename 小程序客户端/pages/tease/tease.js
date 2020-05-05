const app = getApp()
var request = require('../../utils/request.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js');
// pages/tease/tease.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    par:[
      {name: '卫生' ,data: 2 },
      { name: '空气', data: 5 },
      { name: '舒适度', data: 5 }
      ],
    retext: '0',//文字控制标准，目的3决定1
    reSelect: '0',//选中状态
    word_size: '0',//输入文字的长度
    word_value: '',//保存输入的文字
    subtease: ''//手机设备高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({              //这里照抄的维修所以没有更改名称
      url: 'http://119.23.237.30/verifySN',
      method: 'post',
      data: { 'sn': options.sn },
      success: function (res) {
        that.setData({
          sn: options.sn,
          repairid: res.data.data[0].Tencent_ID,
          repairname: res.data.data[0].name,
          repairurl: res.data.data[0].site,
          repairlat: res.data.data[0].latitude,
          repairlng: res.data.data[0].longitude,
        })
      }
    })
    // this.setData({  
    //   repairid: options.id,
    //   repairname: options.repairname,
    //   repairurl: options.repairurl,
    //   repairlat: options.lat,
    //   repairlng: options.lng,
    //   sn: options.sn,
    // })
    //请求评论原因
    wx.request({
      url: 'http://119.23.237.30/jingquName',
      success(res) {
        if (res.result == -1) {
          that.setData({
            par: []
          })
        } else {
          var teaseCS = res.data.data[0].evaluate.split("*/*");
          var parL = [];
          teaseCS.forEach((item)=>{
            parL.push({'name':item , 'data' : 5 });
            that.setData({
              par: parL
            })
          });
        }
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
  //时时统计输入到文本框的字符数
  texts_num: function (e) {
    if (e.detail.cursor >= 1) {//给自己的文本框设置标志
      this.data.retext = 1;
    } else {
      this.data.retext = 0;
    }
    //每一次触发事件都要给出提交按钮的状态标
    this.setData({
      word_size: e.detail.cursor,
      word_value: e.detail.value,
      retext: this.data.retext,
      reSelect: this.data.reSelect
    })
  },
  //卫生红星点击事件
  wsfun:function(e){
    var ws = this.data.par;
    ws[e.target.dataset.text].data = e.target.dataset.num+1;
    this.setData({
      par : ws
    }) 

  },
  //卫生白心点击事件
  wsfun_k:function(e){
    var ws = this.data.par;
    ws[e.target.dataset.text].data = ws[e.target.dataset.text].data + e.target.dataset.num+1;
    this.setData({
      par: ws
    })
  },
  //将数据做一个统计，卫生，空气，舒适度，整体评价
  subrepair:function(){
    var that = this;
    var teasData=this.data.par;
    var obj = {};
    teasData.forEach((item) => {
      obj[item.name] = item.data
    });
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    wx.getUserInfo({
      success: function (res) {
        obj = JSON.stringify(obj);
      wx.request({
        url: 'http://119.23.237.30/tease',
        data: {
          'time': util.formatTime(new Date()),
          'username': res.userInfo.nickName,
          'headphoto': res.userInfo.avatarUrl,
          'nameID': that.data.repairid,       
          'HealthStar': obj,
          'site': that.data.repairurl,
          'name': that.data.repairname,
          'evaluate': that.data.word_value,
          'sn'  : that.data.sn,
        }, 
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if(res.data.result==1){
            wx.navigateTo({
              url: '../thanks/thanks?miaoshu=评价',
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    });
  },
  // 提交按钮,也是获取用户信息的按钮
  onGotUserInfo: function (e) {//点击了授权按钮以后
    //直接调用上传函数
    // console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      this.subrepair();
      console.log("我被授权");
    } else {
      console.log("我被拒绝");
    }
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