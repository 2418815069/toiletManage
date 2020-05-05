 const app = getApp()
var request = require('../../utils/request.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var amapInstance;
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    verify_if:false,
    verify_if_img: false,
    time:'',
    display:'none',
    ditsn:'',  //sn
    detid:'',//id
    point:{},//名字和地址
    addresslist:[],
    lists: {Mnum: '3', Wnum: '3', Cnum: '2'},
    lat:'',
    lon: '',
    address: "",
    distance: "",
    hear_img:'../../image/zanwu.jpg',//ajax拉取服务器图片
    hear_height:"",//根据不同手机计算出图片的高度
    con_height:'',//下半部分的高度
    eve_iim:'',//保修点赞吐槽的高度设置
    image: '../../image/1.png',
    eva_num:3 ,//处理评价的小红心个数
    distance:1,  //距离
  },
  onLoad: function (options) {
    var that =this;
    this.dingshiqi(); 
    var id = options.id;
    var sn = options.sn;
    this.setData({
      detid: id,
      ditsn: sn,
    })
    console.log(that.data.detid)
    amapInstance = new QQMapWX({
      key: 'L6FBZ-YQ4CG-URYQY-IH36I-SXRFZ-IEBI5' //此处使用你自己申请的key
    })
    //获取手机设备的宽度，并计算图片的的高度
     var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          hear_height: (540 / 960) * res.windowWidth,
          con_height: res.windowHeight - (540 / 960) * res.windowWidth+50,
          eve_iim: (res.windowWidth*0.8)/3.0-10
        })
      }
    });
  },
  //周边地址获取
  onShow: function () {
    var that = this;
    this.onLoad();
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    let pages = getCurrentPages(); //页面栈
    let currPage = pages[pages.length - 1]; //当前页面
    that.setData({
      detid: currPage.options.id, //获取上上级页面传的参数
      ditsn: currPage.options.sn
    });
    
    if (that.data.ditsn ==1){
      //that.getData();
      amapInstance.search({
        keyword: '厕所',
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i]._distance < 1000) {
              if (that.data.detid == res.data[i].id) {
                if (i < 3) {
                  that.setData({
                    display: ''
                  })
                }
                var time = res.data[i]._distance / 50
                var times = parseInt(time);
                res.data[i]._distance = parseInt(res.data[i]._distance)
                that.setData({
                  time: times,
                  point: res.data[i],
                  distance: res.data[i]._distance,
                })
              }
              var addresss = "addresslist[" + i + "]";
              that.setData({
                [addresss]: res.data[i]
              })
            } else {
              return
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
    } else if (that.data.ditsn == 0){
      wx.request({
        url: 'http://119.23.237.30/verify',
        method: 'POST',
        data: {
          'Tencent_ID': that.data.detid
        },
        success(res) {
          if (res.data.result) {
            console.log(res.data.data)
            res.data.data[0].title = res.data.data[0].name;
            
            res.data.data[0].address = res.data.data[0].site;
            console.log("进来了")
            amapInstance.calculateDistance({
              to: res.data.data[0].latitude + "," + res.data.data[0].longitude,
              success: function (resq) {
                console.log(resq);
                var time = resq.result.elements[0].distance / 50
                var times = parseInt(time);
                that.setData({
                  time: times,
                  point: res.data.data[0],
                  distance: resq.result.elements[0].distance,
                  verify_if: false,
                  verify_if_img: true,
                  hear_img: 'http://119.23.237.30/headerPicture/' + res.data.data[0].picture
                });
              },
              fail:function(res){
                console.log(res)
              }
            });
          }
        }
      })
    }else{
      wx.request({
        url: 'http://119.23.237.30/verify',
        method: 'POST',
        data: {
          'Tencent_ID': that.data.detid
        },
        success(res) {
          if (res.data.result) {
            res.data.data[0].title = res.data.data[0].name;
            res.data.data[0].address = res.data.data[0].site;
            amapInstance.calculateDistance({
              to: res.data.data[0].latitude + "," + res.data.data[0].longitude,
              success: function (resq) {
                var time = resq.result.elements[0].distance / 50
                var times = parseInt(time);
                that.setData({
                  time: times,
                  point: res.data.data[0],
                  distance: resq.result.elements[0].distance,
                  verify_if: true,
                  verify_if_img: true,
                  hear_img: 'http://119.23.237.30/headerPicture/' + res.data.data[0].picture
                });
              }
            });
          }
        }
      })
    }


    // if (that.data.ditsn != 0 && that.data.ditsn != 1){
    //   //得到人数
    //   console.log(that.data.ditsn);
    //   wx.request({
    //     url: 'http://119.23.237.30/verify',
    //     method: 'POST',
    //     data: {
    //       'Tencent_ID': that.data.detid
    //     },
    //     success(res) {
    //       if (res.data.result == -1) {
    //         that.setData({
    //           verify_if: false
    //         })
    //       } else {
    //         // res.data.data[0].picture 
    //         that.setData({
    //           verify_if: true,
    //           hear_img: 'http://119.23.237.30/headerPicture/' + res.data.data[0].picture
    //         })
    //       }
    //     }
    //   })

      //that.getData();
      // amapInstance.search({
      //   keyword: '厕所',
      //   success: function (res) {
      //     for (var i = 0; i < res.data.length; i++) {
      //       if (res.data[i]._distance < 1000) {
      //         if (that.data.detid == res.data[i].id) {
      //           if (i < 3) {
      //             that.setData({
      //               display: ''
      //             })
      //           }
      //           var time = res.data[i]._distance / 50
      //           var times = parseInt(time);
      //           res.data[i]._distance = parseInt(res.data[i]._distance)
      //           that.setData({
      //             time: times,
      //             point: res.data[i],
      //             distance: res.data[i]._distance,
      //           })
      //         }
      //         var addresss = "addresslist[" + i + "]";
      //         that.setData({
      //           [addresss]: res.data[i]
      //         })
      //       } else {
      //         return
      //       }
      //     }
      //   },
      //   fail: function (res) {
      //     //console.log(res);
      //   },
      //   complete: function (res) {
      //     //console.log(res);
      //   }
      // })


    // }else{
    //   //得到人数
    //   console.log("进来了")
    //   wx.request({
    //     url: 'http://119.23.237.30/verifySN',
    //     method: 'POST',
    //     data: {
    //       'sn': that.data.ditsn
    //     },
    //     success(res) {
    //       if(res.data.result){
    //         console.log(res);
    //         res.data.data[0].title = res.data.data[0].name;
    //         res.data.data[0].address = res.data.data[0].site;
    //         amapInstance.calculateDistance({
    //           to: res.data.data[0].latitude + "," + res.data.data[0].longitude,
    //           success: function (resq) {
    //             console.log(resq);
    //             var time = resq.result.elements[0].distance / 50
    //             var times = parseInt(time);
    //             that.setData({
    //               time: times,
    //               point: res.data.data[0],
    //               distance: resq.result.elements[0].distance,
    //               verify_if: true,
    //               hear_img: 'http://119.23.237.30/headerPicture/' + res.data.data[0].picture
    //             });
    //           }
    //         });
    //       }
    //     }
    //   })
    // }
  },
  dingshiqi: function () {
   var that=this;
    //得到人数
  
    if (that.data.detid != "" && that.data.ditsn != 1 && that.data.ditsn != 0){ 
      console.log(that.data.detid);
      console.log(that.data.ditsn);
      wx.request({
        url: 'http://119.23.237.30/arguments',
        method: 'POST',
        data: {
          'arguments': that.data.detid
        },
        success(res) {
          if (res.data.result == 1) {
            var mannum = res.data.data[0].male.staya==null ? '0': res.data.data[0].male.staya;
            var womannum = res.data.data[0].female.staya == null ?'0':res.data.data[0].female.staya;
            var allurinal = res.data.data[0].male.extension.urinal_id.length;
            var allmanum = res.data.data[0].male.extension.pit_id.length;
            var allwomanum = res.data.data[0].female.extension.pit_id.length;
            var listis = { Mnum: mannum, Wnum: womannum, allurinal: allurinal, allwomanum: allwomanum, allmanum: allmanum, Cnum: 0 }
            that.setData({
              lists: listis
            })

          }
        }
      })
    }
   
     
    setTimeout(function () {
      that.dingshiqi()
    }, 30000)
  },
  // 距离
  openmap: function (e) {
    var that=this;
    // 调用腾讯接口
    if (that.data.ditsn == 1) {
      wx.openLocation({
        latitude: that.data.point.location.lat,
        longitude: that.data.point.location.lng,
        scale: 14
      })
    }else{
      wx.openLocation({
        latitude: parseFloat(that.data.point.latitude),
        longitude: parseFloat(that.data.point.longitude),
        scale: 14
      })
    }
    
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //处理评价小心心的函数
  evaluate:function(tt){
    var that=this;
    console.log(tt)
   wx.request({
      url: tt,
      method: 'get',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res);
        // that.setData({
        //   eva_num:res.data.eva;
        // })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //处理报修页面和吐槽页面的跳转
  repair:function(){
    var that=this;
      wx.navigateTo({
        url: '../repair/repair?sn=' + that.data.ditsn
      })
    // if (that.data.detid) {
    //   wx.navigateTo({
    //     url: '../repair/repair?id=' + that.data.detid + '&repairname=' + that.data.point.title + '&repairurl=' + that.data.point.address +'&lat=' + that.data.point.location.lat + '&lng=' + that.data.point.location.lng + '&sn=' + that.data.ditsn
    //   })
    // }else{
    //   wx.navigateTo({
    //     url: '../repair/repair?id=' + that.data.detid + '&repairname=' + that.data.point.title + '&repairurl=' + that.data.point.address + '&lat=' + that.data.point.latitude + '&lng=' + that.data.point.longitude + '&sn=' + that.data.ditsn
    //   })
    // }
    
  },
  tease:function(){
    var that= this;
    wx.navigateTo({
      url: '../tease/tease?sn=' + that.data.ditsn
    })
    // if (that.data.detid) {
    //   wx.navigateTo({
    //   url: '../tease/tease?id=' + that.data.detid + '&repairname=' + that.data.point.title + '&repairurl=' + that.data.point.address  + '&lat=' + that.data.point.location.lat + '&lng=' + that.data.point.location.lng + '&sn=' + that.data.ditsn
    //   })
    // }else{
    //   wx.navigateTo({
    //   url: '../tease/tease?id=' + that.data.detid + '&repairname=' + that.data.point.title + '&repairurl=' + that.data.point.address + '&lat=' + that.data.point.latitude + '&lng=' + that.data.point.longitude + '&sn=' + that.data.ditsn
    //   })
    // }
  },
  add: function () {
    var that = this;
    wx.navigateTo({
      url: '../add/add?id=' + that.data.detid
    })
  },

})