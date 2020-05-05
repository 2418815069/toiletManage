// pages/add/add.js
const app = getApp()
var request = require('../../utils/request.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js');
var amapInstance;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detid: '',//id
    repicture: '0',//图片控制标志，目的3决定1
    upimgae: [],//保存上传的图片，路径
    list_two: "0",//保修提交图片不足2张时，显示一个在添加的按钮
    reSelect: 0,//选中状态
    word_value:'', //input的内容
    latitude: "1",//中心纬度
    longitude: "1",//中心经度
    show:false,
    name:'',    //输入名字
    site:'',        //输入地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    amapInstance = new QQMapWX({
      key: 'L6FBZ-YQ4CG-URYQY-IH36I-SXRFZ-IEBI5' //此处使用你自己申请的key
    })
    if(!options.id){  //没有腾讯ID的时候
      // 获取当前位置
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          that.setData({
            show  :  true,
            latitude: res.latitude,
            longitude: res.longitude,
          })
        }
      })
    }else{      //有腾讯ID的时候
    
      //获取地址和其他东西
      var id = options.id;
      this.setData({
        show: false,
        detid: id
      })

      amapInstance.search({
        keyword: '厕所',
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i]._distance < 1000) {
              if (that.data.detid == res.data[i].id) {
                that.setData({
                  point: res.data[i]
                })
              }
            }
          }
        },
        fail: function (res) {
          //console.log(res);
        },
        complete: function (res) {
          //console.log(res);
        }
      })
    }
    

  },
  //判断提交按钮的函数
  jude_submit() {
    var that = this;
    if(that.data.show == 1){
      //每一次触发事件都要给出提交按钮的状态标志
      if (this.data.name != "" && this.data.site != "" && this.data.word_value != "" && this.data.list_two == 1) {
        this.data.reSelect = 1;//给选中状态添加选中

      } else {
        this.data.reSelect = 0;

      }
    }else{
      //每一次触发事件都要给出提交按钮的状态标志
      if (this.data.word_value != "" && this.data.list_two == 1) {
        this.data.reSelect = 1;//给选中状态添加选中

      } else {
        this.data.reSelect = 0;

      }
    }
   
  },
  jude_showadd() {
    if (this.data.upimgae.length > 0 && this.data.upimgae.length < 3) {
      this.data.list_two = 1;
    } else {
      this.data.list_two = 0;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //点击相机图片触发事件
  re_select: function () {
    //直接调用选择相机
    var that = this;
    wx.chooseImage({
      count: 1,//最多选中3张
      sizeType: ['original', 'compressed'],//图片大小，原图和压缩图
      sourceType: ['album', 'camera'],//相片来源，本地或者相机
      success: function (res) {
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          that.data.upimgae.push(res.tempFilePaths[i]);
        }
        //判断上传的照片数量，如果大于1小于3显示加号
        that.jude_showadd();
        that.data.repicture = 1;//给出已经有图片的状态
        //每一次触发事件都要给出提交按钮的状态标志
        that.jude_submit();
        that.setData({
          upimgae: that.data.upimgae,//存储上传的照片
          repicture: that.data.repicture,//将图片上传设置为1 可以点亮提交按钮，同时也将相机按钮隐藏
          list_two: that.data.list_two,//是否需要显示加号
          reSelect: that.data.reSelect
        })
      },
    })
  },
  //还需要继续上传是
  re_select_two: function () {
    var that = this;
    //拿到现在上传的图片数量
    var num_image = that.data.upimgae.length;
    var cansele = 3 - num_image;
    wx.chooseImage({
      count: cansele,//最多选中1张
      sizeType: ['original', 'compressed'],//图片大小，原图和压缩图
      sourceType: ['album', 'camera'],//相片来源，本地或者相机
      success: function (res) {
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          that.data.upimgae.push(res.tempFilePaths[i]);
        }
        //判断上传的照片数量，如果大于1小于3显示加号
        that.jude_showadd();
        that.setData({
          upimgae: that.data.upimgae,
          list_two: that.data.list_two,//是否需要显示加号
        })
      },
    })
  },
  //点击删除图片按钮
  quxiao_image: function (e) {
    console.log(e);
    var that = this;
    let ii = e.currentTarget.dataset.index;//拿到要删除的角标
    that.data.upimgae.splice(ii, 1);
    //判断上传的照片数量，如果小于1则需要显示加号
    if (that.data.upimgae.length > 0) {//2张
      that.data.list_two = 1;
    } else {//0张
      that.data.list_two = 0;//不显示加号，
      that.data.repicture = 0;//显示相机按钮
    }
    //每一次触发事件都要给出提交按钮的状态标志
    that.jude_submit();
    that.setData({
      repicture: that.data.repicture,//相机标志
      list_two: that.data.list_two,//图片加号标志
      upimgae: that.data.upimgae,//图片数组
      reSelect: that.data.reSelect//提交按钮状态
    })
  },
  //点击每一张图片可以查看
  repair_image: function (e) {
    console.log(e);
    var that = this;
    let ii = e.currentTarget.dataset.index;//拿到要查看的角标
    wx.previewImage({
      current: that.data.upimgae[ii], // 当前显示图片的http链接
      urls: that.data.upimgae // 需要预览的图片http链接列表
    })
  },
  //监控input中的文字
  //时时统计输入到文本框的字符数
  texts_num: function (e) {
    var that =this;
    //每一次触发事件都要给出提交按钮的状态标志
    this.data.word_value = e.detail.value
    this.jude_submit();
    this.setData({
      word_value: e.detail.value,
      reSelect: that.data.reSelect//提交按钮状态
    })
  },
  name_num: function (e) {
    var that = this;
    //每一次触发事件都要给出提交按钮的状态标志
    this.data.name = e.detail.value
    this.jude_submit();
    this.setData({
      name: e.detail.value,
      reSelect: that.data.reSelect//提交按钮状态
    })
  },
  site_num: function (e) {
    var that = this;
    //每一次触发事件都要给出提交按钮的状态标志
    this.data.site = e.detail.value
    this.jude_submit();
    this.setData({
      site: e.detail.value,
      reSelect: that.data.reSelect//提交按钮状态
    })
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
  //点击提交
  subrepair:function(){
    var that = this;
    if(that.data.show == true){
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      // console.log(that.data.name+",,,,,,"+that.data.latitude);
      wx.getUserInfo({      //首页上报的
        success: function (res) {
          //提交数据
          console.log(that.data.detid.length);
          var arrdata = {
            "name": that.data.name,
            "site": that.data.site,
            "Tencent_ID": that.data.detid,  
            "sn": that.data.word_value,
            "latitude": that.data.latitude,
            "longitude": that.data.longitude, 
          };
          wx.request({
            url: 'http://119.23.237.30/add',
            data: arrdata,
            header: {
              'content-type': 'application/json'
            },
            method: 'post',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log(res.data.data);
              moreImag(res.data.data)
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      });
    }else{
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      wx.getUserInfo({      //腾讯id有的
        success: function (res) {
          console.log(that.data.point)
          //提交数据
          var arrdata = {
            "name": that.data.point.title,
            "site": that.data.point.address,
            "Tencent_ID": that.data.point.id,
            "sn": that.data.word_value,
            "latitude":that.data.point.location.lat,
            "longitude": that.data.point.location.lng,
          };
          wx.request({
            url: 'http://119.23.237.30/add',
            data: arrdata,
            header: {
              'content-type': 'application/json'
            },
            method: 'post',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              console.log(res.data.data);
              moreImag(res.data.data)
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      });
    }
    
    //多图上传
    function moreImag(insertId) {
      
      var img_num = that.data.upimgae.length;
      var img_arr = that.data.upimgae;
      console.log(insertId);
      wx.uploadFile({
        url: 'http://119.23.237.30/add_img',
        filePath: img_arr[0],
        name: 'img',
        header: {
          "Content-Type": "multipart/form-data",
          'accept': 'application/json',
          'Authorization': 'okgoodit'//若有token，此处换上你的token，没有的话省略
        },
        formData: ({//上传图片所要携带的参数
          imagesID: insertId
        }),
        success: function (res) {//第一张上传成功
            wx.navigateTo({
              url: '../thanks/thanks?miaoshu=添加',
            })
        }
      })
    }
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