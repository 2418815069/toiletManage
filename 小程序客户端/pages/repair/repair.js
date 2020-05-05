const app = getApp()
var request = require('../../utils/request.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var util = require('../../utils/util.js');
// pages/repair/repair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      csw:[
        // { "name": '灯泡坏了', "state":'0'},
        // { "name": '水管坏了', "state":'0'},
        // { "name": '门锁坏了', "state":'0'},
        // { "name": '窗口坏了', "state":'0'},
        // { "name": '屋顶漏水', "state": '0' },
        // { "name": '水管堵塞', "state": '0' },
        // { "name": '地板损坏', "state": '0' }
      ],
      upimgae:[],//保存上传的图片，路径
      repairid:'',//保留需要报修的厕所id
      repairname:'',//报修厕所名字
      repairurl:'',//报修厕所地址
      repairlat: '',//报修厕所经纬度
      repairdata:[],//最终提交结果
      reSelect:'0',//选中状态
      rebacase:'0',//控制选中原因之一，目的3选1，来决定提交按钮的状态
      retext:'0',//文字控制标准，目的3决定1
      repicture: '0',//图片控制标志，目的3决定1
      word_size:'0',//输入文字的长度
      word_value:'',//保存输入的文字
      list_two:"0",//保修提交图片不足2张时，显示一个在添加的按钮
      user_arr:[],//用于存放用户信息的
      canuse:0,//用于显示授权的按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    wx.request({
      url: 'http://119.23.237.30/verifySN',
      method : 'post',
      data: {'sn': options.sn},
      success:function(res){
        console.log(res.data.data);
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
   
    //请求保修原因
    wx.request({
      url: 'http://119.23.237.30/jingquName',
      success(res){
        if(res.result==-1){
            that.setData({
              csw:[]
            })
        }else{
          var new_cws=[];
          res.data.data = res.data.data[0].repairs.split('*/*');
          for(let i=0;i<res.data.data.length;i++){
            new_cws.push({ 'name': res.data.data[i], "state": '0'});
          }
          that.setData({
            csw: new_cws
          })
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
  //判断提交按钮的函数
  jude_submit(){
    //每一次触发事件都要给出提交按钮的状态标志
    if (this.data.rebacase == 1 || this.data.retext == 1 || this.data.repicture == 1) {
      this.data.reSelect = 1;//给选中状态添加选中
    } else {
      this.data.reSelect = 0;
    }
  },
  //判断上传图片的数量，来决定是否显示加号
  jude_showadd(){
    if (this.data.upimgae.length > 0 && this.data.upimgae.length < 3) {
      this.data.list_two = 1;
    } else {
      this.data.list_two = 0;
    }
  },
  //报修信息点击函数
  repair_text:function(e){
    var cwi = e.currentTarget.dataset.index;
    if (this.data.csw[cwi].state==0){
      this.data.csw[cwi].state = 2;
    }else{
      this.data.csw[cwi].state = 0;
    }
    //变量每一项，给自己添加状态
    for(var i=0;i<this.data.csw.length;i++){
      if (this.data.csw[i].state==2){
        this.data.rebacase = 1;
        break;
      }
    }
    if (i == this.data.csw.length){//一个没有选中
      this.data.rebacase = 0;
    }
    //每一次触发事件都要给出提交按钮的状态标志
    this.jude_submit();
    this.setData({
      csw: this.data.csw,
      rebacase:this.data.rebacase,
      reSelect: this.data.reSelect
    })
  },
  //时时统计输入到文本框的字符数
  texts_num:function(e){
    if (e.detail.cursor>=1){//给自己的文本框设置标志
      this.data.retext = 1;
    }else{
      this.data.retext=0;
    }
    //每一次触发事件都要给出提交按钮的状态标志
    this.jude_submit();
    this.setData({
      word_size:e.detail.cursor,
      word_value: e.detail.value,
      retext: this.data.retext,
      reSelect: this.data.reSelect
    })
  },
  //点击相机图片触发事件
  re_select:function(){
    //直接调用选择相机
    var that=this;
    wx.chooseImage({
      count:3,//最多选中3张
      sizeType: ['original', 'compressed'],//图片大小，原图和压缩图
      sourceType: ['album', 'camera'],//相片来源，本地或者相机
      success: function(res) {
        for(let i=0;i<res.tempFilePaths.length;i++){
          that.data.upimgae.push(res.tempFilePaths[i]);
        }
        //判断上传的照片数量，如果大于1小于3显示加号
        that.jude_showadd();
        that.data.repicture=1;//给出已经有图片的状态
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
  re_select_two:function(){
    var that = this;
    //拿到现在上传的图片数量
    var num_image=that.data.upimgae.length;
    var cansele=3-num_image;
    wx.chooseImage({
      count: cansele,//最多选中1张
      sizeType: ['original', 'compressed'],//图片大小，原图和压缩图
      sourceType: ['album', 'camera'],//相片来源，本地或者相机
      success: function(res) {
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
  quxiao_image:function(e){
    console.log(e);
    var that=this;
    let ii=e.currentTarget.dataset.index;//拿到要删除的角标
    that.data.upimgae.splice(ii,1);
    //判断上传的照片数量，如果小于1则需要显示加号
    if (that.data.upimgae.length >0) {//2张
      that.data.list_two = 1;
    }else{//0张
      that.data.list_two = 0;//不显示加号，
      that.data.repicture=0;//显示相机按钮
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
  repair_image:function(e){
    console.log(e);
    var that = this;
    let ii = e.currentTarget.dataset.index;//拿到要查看的角标
    wx.previewImage({
      current: that.data.upimgae[ii], // 当前显示图片的http链接
      urls: that.data.upimgae // 需要预览的图片http链接列表
    })
  },

  //这是给维修人员的接口
  // testSubmit: function (e) {
  //   var self = this;
  //   wx.getUserInfo({
  //       success:function(Uers){
          
  //     //调用微信登录接口
  //     wx.login({
  //       success: function (loginCode) {
  //         var appid = 'wx60abfae126ee93df'; //填写微信小程序appid
  //         var secret = 'c5ae81408dc6f8d60fcfc599f5703ff0'; //填写微信小程序secre
  //         //调用request请求api转换登录凭证
  //         wx.request({
  //           url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx60abfae126ee93df&secret=c5ae81408dc6f8d60fcfc599f5703ff0&js_code=' + loginCode.code,
  //           header: {
  //             'content-type': 'application/json'
  //           },
  //           success: function (res) {
  //             var openid = res.data.openid; //用户openid
  //             //从后台获取access_token
  //             // 测试所用服务器，之后修改
  //             wx.request({
  //               url: 'http://119.23.237.30/access',
  //               success(res) {
  //                 var _access_token = res.data.data[0].access_token;
  //                 //拿到保修原因选中项
  //                 var arr2 = [];
  //                 var arr = self.data.csw.filter((item) => {
  //                   return item.state != 0;
  //                 })
  //                 arr.forEach((item) => {
  //                   arr2.push(item.name);
  //                 });
  //                 wx.request({
  //                   url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _access_token,
  //                   method: 'POST',
  //                   data: {
  //                     'touser': openid,
  //                     'template_id': 'BDP0mxepa6Twxj7iBHeCHBSTCjL9uYDN2DxJPRKapEk',
  //                     'form_id': e.detail.formId,
  //                     'data': {
  //                       "keyword1": { "value": Uers.userInfo.nickName, "color": "#173177" },
  //                       "keyword2": { "value": arr2.join(","), "color": "#173177" },
  //                       "keyword3": { "value": util.formatTime(new Date()), "color": "#173177" },
  //                       "keyword4": { "value": self.data.repairurl, "color": "#173177" },
  //                     },
  //                     "emphasis_keyword": "keyword1.DATA"
  //                   },
  //                   header: {
  //                     'content-type': 'application/json' // 默认值
  //                   },
  //                   success: function (res) {
  //                     console.log(res, "push msg");
  //                   }
  //                 })

  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //     }
  //   });
  // },
  //提交按钮
  // subrepair:function(){
  //   var that=this;
  //   wx.getSetting({
  //     success(res) {
  //       if (!res.authSetting['scope.userInfo']) {
  //         //未授权，显示授权的提示框
         
  //       }else{
  //         that.imageUpdata();
  //       }
  //     }
  //   })

  // },
  // 提交按钮,也是获取用户信息的按钮
  onGotUserInfo: function (e) {//点击了授权按钮以后
    //直接调用上传函数
    // console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      this.imageUpdata();
      console.log("我被授权");
    } else {
      console.log("我被拒绝");
    }
  },
  //提交授权上传函数
 imageUpdata(){
   var that = this;
   var tongji = 0;
   //拿到保修原因选中项
   var arr2 = [];
   var arr = this.data.csw.filter((item) => {
     return item.state != 0;
   })
   arr.forEach((item) => {
     arr2.push(item.name);
   })
   // 已经授权，可以直接调用 getUserInfo 获取头像昵称
   wx.getUserInfo({
     success: function (res) {
       that.data.user_arr.push(res.userInfo.nickName);
       that.data.user_arr.push(res.userInfo.avatarUrl);
       that.setData({
         user_arr: that.data.user_arr
       })
       //console.log(that.data.user_arr);
       //将提交的信息和之前的id和地址一并提交上去
       that.data.repairdata.push(
         { "repairs": arr2 }, //保修数组
         { "repairid": that.data.repairid },
         { "repairname": that.data.repairname },
         { "repairurl": that.data.repairurl },
         { "lat": that.data.repairlat },
         { "lng": that.data.repairlng },
         { 'reptext': that.data.word_value },//文本框内容
         { "repairflag": that.data.repicture },//图片控制
         { "wxuser": that.data.user_arr },//微信名字和图片地址
         { "sn"    : that.data.sn},  //自己的sn
       );
       var arrdata = that.data.repairdata;
       //提交数据
       wx.request({
         url: 'http://119.23.237.30/baoxiu',
         data: arrdata,
         header: {
           'content-type': 'application/json'
         },
         method: 'post',
         dataType: 'json',
         responseType: 'text',
         success: function (res) {
           if (res.data.result == 1) {
             wx.navigateTo({
               url: '../thanks/thanks?miaoshu=报修',
               success(){
                 
               }
             })
           } else {
             //开始上传图片,用递归的方法
             console.log(res.data.data);
             moreImag(0, res.data.data.insertId);//第一次调用
           }
         },
         fail: function (res) { },
         complete: function (res) { },
       })
       //回退一层
       function retu() {
         wx.navigateBack({
           delta: 2
         })
       }
       //多图上传
       function moreImag(i,image_id) {
         var img_num = that.data.upimgae.length;
         var img_arr = that.data.upimgae;
         console.log(1);
         wx.uploadFile({
           url: 'http://119.23.237.30/baoxiu_img',
           filePath: img_arr[i],
           name: 'img',
           header: {
             "Content-Type": "multipart/form-data",
             'accept': 'application/json',
             'Authorization': 'okgoodit'//若有token，此处换上你的token，没有的话省略
           },
           formData: ({//上传图片所要携带的参数
             imagesID: image_id
           }),
           success: function (res) {//第一张上传成功
              i++; 
             if (i < img_num && res.data == 2){
                moreImag(i,image_id);//递归调用自己
              }else{//上传完毕
               console.log("成功");
               wx.navigateTo({
                 url: '../thanks/thanks?miaoshu=报修',
               })
              }
            
            //  if (res.data == 2) {
            //    tongji++;
            //  }
            //  if (tongji == that.data.upimgae.length) {
            //    wx.showToast({
            //      title: '谢谢您的信息',
            //      success: function () {
            //        setTimeout(retu, 1200);//用定时器控制调用返回上一层的时间
            //      }
            //    })
            //  }
           }
         })
       }

     }//用户授权成功，拿到了用户信息才可以上传
   })
   
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