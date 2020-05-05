const app = getApp();
const system = app.getAppSysInfo();
var request = require('../../utils/request.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var amapInstance;
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    //selectcolor
    //text是指推荐文本的颜色，img是指男女图标的颜色，span是指大号实时人数字体的颜色
    changeclass: [{
      "text": "selectcolor", "img": "img", "span": "td3"
    }, {
      "text": "", "img": "img1", "span": ""
    }, {
      "text": "", "img": "img1", "span": ""
    }],
    changetype: 0,
    selected_id: 0,//选中地址id
    selected_ID: 0,
    Height: 0,
    sysheigth: 350,
    scale: 12,//缩放级别，取值范围为5-18
    latitude: "1",//中心纬度
    longitude: "1",//中心经度
    cid: '',
    markersid: 0,
    markers: [],//标记点
    polyline: [],//路线
    latandlon: [],
    controls: [],
    circles: [],
    flassimg: 1,//一个是否更新的问题
    dingshiqiflag: 0,
    change: {
      "path": "",
      "id": ""
    },
    pagelist2: [{
      "man": "",
      "woman": ""
    }, {
      "man": "-",
      "woman": "-"
    }, {
      "man": "-",
      "woman": "-"
    }],
    animationData: 0,//动画
    sousuo: '',     //搜索内容
  },

  onLoad: function (option) {
    var that = this;
    // console.log(option);
    // 测试所用服务器，之后修改
    // wx.request({
    //   url: 'http://119.23.237.30/jingquName',
    //   success(res) {
    //     //页面加载的时候发送请求去得到  标题的修改
    //     wx.setNavigationBarTitle({
    //       title: res.data.data[0].name
    //     })
    //   }
    // })

    //暂时没有用到
    that.setData({
      // cid: option.cid
    });
    // amapInstance = new amapFile.AMapWX({ key: 'cd17f895f7d70ef688f4bf600e067a8e' });
    //腾讯地图key
    amapInstance = new QQMapWX({
      key: 'L6FBZ-YQ4CG-URYQY-IH36I-SXRFZ-IEBI5' //此处使用你自己申请的key
      //key:'MITBZ-KTGRV-AB3PT-UCSGI-PJNZZ-WUBCJ'
    }),
      // 设置地图的高度
      wx.getSystemInfo({
        success: function (res) {
          //设置map高度，根据当前设备宽高满屏显示
          that.setData({
            view: {
              Height: res.windowHeight
            },
            syshigth: res.windowHeight
          })
        }
      })


    // 获取地图麻点

    //获取天气预报
    // wx.getLocation({
    //   success: function(res) {
    //     var url = 'http://api.map.baidu.com/telematics/v3/weather?location=' + res.longitude + ',' + res.latitude+'&output=json&ak=ily78hy0Uo7DWj37eOGmUTM7BGd13L5Z';
    //     wx.request({
    //       url: url,
    //       success: function (res) {
    //         // console.log(res);
    //         that.setData({
    //           now: res.data.results[0].weather_data[0],
    //           nowPM25: res.data.results[0].pm25,
    //           temperature: res.data.results[0].weather_data[0].date.split("：")[1].slice(-10,-1)
    //         });
    //         // console.log(res.data.results[0].weather_data[0].date.slice(11,16));
    //       }
    //     })
    //   },
    // })

    //
  },
  //当页面刷新后，获得之前选中的图标
  getoldmarkes: function () {
    if (this.data.selected_ID != "") {
      var id = "";
      for (var k = 0; k < this.data.latandlon.length; k++) {
        if (this.data.selected_ID == this.data.latandlon[k].id) {
          id = k;
        }
      }
      if (id != "") {
        var that = this;

        //点击标点，之前选中图标回复，选中图标变化
        //区别之前选中图标是否是推荐图标
        var str1 = "markers[" + that.data.selected_id + "].width";
        var str2 = "markers[" + that.data.selected_id + "].height";
        if (that.data.selected_id < 3) {
          that.setData({
            [str1]: 32,
            [str2]: 44
          })
        }
        else {
          that.setData({
            [str1]: 24,
            [str2]: 33
          })
        }
        //改变新图标

        var str3 = "markers[" + id + "].width";
        var str4 = "markers[" + id + "].height";
        that.setData({
          [str3]: 40,
          [str4]: 55
        })
        that.setData({
          selected_id: id,
          selected_ID: that.data.latandlon[id].id
        })
        // changeclass: [{
        //   "text": "selectcolor", "img": "img", "span": "td3"
        // }, {
        //   "text": "", "img": "img1", "span": ""
        // }, {
        //   "text": "", "img": "img1", "span": ""
        // }],
        //以下是对应调节文字区显示的变化
        for (var k = 0; k < 3; k++) {
          var str = "changeclass[" + k + "].text";
          var str1 = "changeclass[" + k + "].img";
          var str2 = "changeclass[" + k + "].span";
          that.setData({
            [str]: "",
            [str1]: "img1",
            [str2]: ""
          })
        }
        if (id >= 0 & id <= 2) {
          var str = "changeclass[" + id + "].text";
          var str1 = "changeclass[" + id + "].img";
          var str2 = "changeclass[" + id + "].span";
          that.setData({
            [str]: "selectcolor",
            [str1]: "img",
            [str2]: "td3"
          })
        }
      }
    }
  },
  //循环建造标记点
  getData: function () {
    var that = this;
    var tentxunNum = 0;
    var numID = 0;
    amapInstance.search({
      keyword: '厕所',
      success: function (res) {
        //拿取自己服务器上面的厕所
        wx.request({
          url: 'http://119.23.237.30/allLavatory?lat=' + that.data.latitude + '&lng=' + that.data.longitude,
          success(resq) {
            if (resq.data.result == 1) {
              for (var i = 0; i < resq.data.data.length; i++) {
                if(resq.data.data[i].nameID != 0){
                  numID++;
                  var str = "latandlon[" + (numID) + "]";
                  var datas = {
                    "latitude": resq.data.data[i].latitude,
                    "longitude": resq.data.data[i].longitude,
                    "id": resq.data.data[i].Tencent_ID,
                    "sn": resq.data.data[i].nameID
                  }
                  that.setData({
                    [str]: datas
                  })
                }
                   // that.addmarkert(resqu.result.elements[0].to.lat, resqu.result.elements[0].to.lng, 1, resq.data.data[i].nameID);   
              }
                
                setTimeout(function () {
                  for (var j = 1; j < that.data.latandlon.length; j++) {
                    that.addmarkert(that.data.latandlon[j].latitude, that.data.latandlon[j].longitude, that.data.latandlon[j].id, that.data.latandlon[j].sn, j-1);
                  }
                  // if (that.data.polyline == "") {
                  //   var lat = that.data.latandlon[1].latitude;
                  //   var lon = that.data.latandlon[1].longitude;
                  //   that.end(lat, lon);
                  // }
                  //要延时执行的代码
                }, 100) //延迟时间 这里是1秒
              }
            }
        });
      }
    });
  },
  //标记点生成函数
  addmarkert: function (latitude, longitude, ID, SN, w) {

    var that = this;
    var id = w;
    if (id == 0) {
      if (SN) {
        var mark = {
          id: id,
          iconPath: "../../image/bz.png", //显示图标
          latitude: latitude, //纬度
          longitude: longitude, //经度
          width: 32,
          height: 44,
          ID: ID,
          sn: SN
        }
      } else {
        var mark = {
          id: id,
          iconPath: "../../image/bz0.png", //显示图标
          latitude: latitude, //纬度
          longitude: longitude, //经度
          width: 32,
          height: 44,
          ID: ID,
          sn: SN
        }
      }
    }
    else if (id < 3) {
      if (SN) {
        var mark = {
          id: id,
          iconPath: "../../image/bz.png", //显示图标
          latitude: latitude, //纬度
          longitude: longitude, //经度
          width: 32,
          height: 44,
          ID: ID,
          sn: SN
        }
      } else {
        var mark = {
          id: id,
          iconPath: "../../image/bz0.png", //显示图标
          latitude: latitude, //纬度
          longitude: longitude, //经度
          width: 32,
          height: 44,
          ID: ID,
          sn: SN
        }
      }

      // console.log(mark.iconPath);
    } else if (id >= 3 && id < 10) {
      // console.log(id);
      if (SN) {
        var mark = {
          id: id,
          iconPath: "../../image/bz.png", //显示图标
          latitude: latitude, //纬度
          longitude: longitude, //经度
          width: 32,
          height: 44,
          ID: ID,
          sn: SN
        }
      } else {
        var mark = {
          id: id,
          iconPath: "../../image/bz3.png", //显示图标
          latitude: latitude, //纬度
          longitude: longitude, //经度
          width: 32,
          height: 44,
          ID: ID,
          sn: SN
        }
      }
    } else if (id >= 10) {
      // console.log(id);
      return;
    }


    var markerss = this.data.markers;
    markerss[w] = mark;
    // markerss.push(mark);

    that.setData({
      markers: markerss,
      markersid: id + 1
    })
  },
  //定时器，循环执行自身,动态改变人数
  dingshiqi: function () {
    var that = this;
    that.setData({
      dingshiqiflag: 1
    });
    // console.log("人数刷新");

    var Wnum = Math.floor(Math.random() * 5);
    var Mnum = Math.floor(Math.random() * 5);
    var list = {
      "man": Mnum,
      "woman": Wnum
    };
    var str = "pagelist2[0]";
    that.setData({
      [str]: list
    });
    setTimeout(function () {
      that.dingshiqi()
    }, 3000)
  },
  //定时器2，循环执行自身,实现图标动画
  dingshiqi2: function () {
    var that = this;
    that.onLoad();
    //console.log("重载页面");
    setTimeout(function () {
      that.dingshiqi2()
    }, 60000)
  },
  //定时器3，实现小远点的动画
  dingshiqi3: function () {
    var that = this;
    setTimeout(function () {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          // console.log(res);
          // console.log(" wx.getLocation:" + res.latitude + "," + res.longitude);
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            scale: 12,
            animationData: 0//结束动画
          })
          if (that.data.dingshiqiflag == 0) {
            that.dingshiqi();
            that.dingshiqi2();
            that.setData({
              lat: res.latitude,
              lon: res.longitude
            })
          }
          that.getData();
          if (that.data.dingshiqiflag == 1) {
            that.getoldmarkes();
          }
        }
      })
    }, 300)
  },

  //点击标记点触发事件，
  markertap: function (e) {
    var that = this;
    //点击标点，之前选中图标回复，选中图标变化
    //区别之前选中图标是否是推荐图标
    var str1 = "markers[" + that.data.selected_id + "].width";
    var str2 = "markers[" + that.data.selected_id + "].height";
    if (that.data.selected_id < 3) {
      that.setData({
        [str1]: 32,
        [str2]: 44
      })
    }
    else {
      that.setData({
        [str1]: 24,
        [str2]: 33
      })
    }
    //改变新图标

    var id = e.markerId;
    var str3 = "markers[" + e.markerId + "].width";
    var str4 = "markers[" + e.markerId + "].height";
    that.setData({
      [str3]: 40,
      [str4]: 55
    })

    that.setData({
      selected_id: e.markerId,
      selected_ID: e.target.dataset.id[e.markerId]
    })
    // changeclass: [{
    //   "text": "selectcolor", "img": "img", "span": "td3"
    // }, {
    //   "text": "", "img": "img1", "span": ""
    // }, {
    //   "text": "", "img": "img1", "span": ""
    // }],
    //以下是对应调节文字区显示的变化
    for (var k = 0; k < 3; k++) {
      var str = "changeclass[" + k + "].text";
      var str1 = "changeclass[" + k + "].img";
      var str2 = "changeclass[" + k + "].span";
      that.setData({
        [str]: "",
        [str1]: "img1",
        [str2]: ""
      })
    }
    if (id >= 0 & id <= 2) {
      var str = "changeclass[" + id + "].text";
      var str1 = "changeclass[" + id + "].img";
      var str2 = "changeclass[" + id + "].span";
      that.setData({
        [str]: "selectcolor",
        [str1]: "img",
        [str2]: "td3"
      })
    }
    //调用路径生成函数
    var lat = e.target.dataset.id[e.markerId].latitude;
    var lon = e.target.dataset.id[e.markerId].longitude;
    // this.end(lat, lon);
    that.detail();
  },

  //点击缩放按钮动态请求数据
  // controltap(e) {

  //   var that = this;
  //   // console.log("scale===" + this.data.scale)
  //   if (e.controlId === 1) {
  //     // if (this.data.scale === 13) {
  //     that.setData({
  //       scale: --this.data.scale
  //     })
  //     // }
  //   } else if (e.controlId === 2) {
  //     //  if (this.data.scale !== 13) {
  //     that.setData({
  //       scale: ++this.data.scale
  //     })
  //     // }
  //   } else if (e.controlId === 3) {
  //     wx.getLocation({
  //       type: 'gcj02',
  //       success: function(res) {
  //       //  console.log(res)
  //         var latitude = res.latitude
  //         var longitude = res.longitude
  //         that.setData({
  //           latitude: latitude,
  //           longitude: longitude
  //         })
  //       }
  //     })
  //   } else if (e.controlId === 4) {
  //     wx.navigateTo({
  //       url: '../classify/classify'
  //     })
  //   } else if (e.controlId === 5) {
  //     wx.navigateTo({
  //       url: '../huodong/huodong'
  //     })
  //   }
  // },

  onShow: function () {
    var that = this;
    // 获取当前位置
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // console.log(res);
        // console.log(" wx.getLocation:" + res.latitude + "," + res.longitude);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        // 如果没有获取到经纬度，执行后面
        if (that.data.dingshiqiflag == 0) {
          that.dingshiqi();
          that.dingshiqi2();
          that.setData({
            lat: res.latitude,
            lon: res.longitude
          })
        }

        that.getData();
        if (that.data.dingshiqiflag == 1) {
          that.getoldmarkes();
        }


        // 

      }
    })
  },
  // 下拉刷新回调接口
  // onPullDownRefresh() {
  //   wx.showNavigationBarLoading() //在标题栏中显示加载
  //   var that = this
  //   // 调取数据
  //   that.getData();
  //   setTimeout(function() {
  //     wx.hideNavigationBarLoading() //完成停止加载
  //     wx.stopPullDownRefresh() //停止下拉刷新
  //   }, 1500)
  // },
  //路径生成函数
  end: function (lat, lon) {
    var coors;
    var that = this;
    // latitude: "1",
    //   longitude: "1",
    //console.log(that.data.latitude + ',' + that.data.longitude);
    wx.request({
      url: 'https://apis.map.qq.com/ws/direction/v1/walking/?from=' + that.data.latitude + ',' + that.data.longitude + '&to=' + lat + ',' + lon + '&output=json&callback=cb&key=22VBZ-REEK5-WVSI7-QKCOP-QPM6E-W7BPO',
      success: function (res) {
        console.log(res);
        coors = res.data.result.routes[0].polyline
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
  //标签点击函数
  tapclick: function (e) {

    var that = this;
    //其他文字颜色回复
    for (var k = 0; k < 3; k++) {
      var str = "changeclass[" + k + "].text";
      var str1 = "changeclass[" + k + "].img";
      var str2 = "changeclass[" + k + "].span";
      that.setData({
        [str]: "",
        [str1]: "img1",
        [str2]: ""
      })
    }
    //改变选中文本颜色
    var id = e.target.id % 3
    if (id >= 0 & id <= 2) {
      var str = "changeclass[" + id + "].text";
      var str1 = "changeclass[" + id + "].img";
      var str2 = "changeclass[" + id + "].span";
      that.setData({
        [str]: "selectcolor",
        [str1]: "img",
        [str2]: "td3"
      })
    }
    //对应改变上列图标
    var str1 = "markers[" + that.data.selected_id + "].width";
    var str2 = "markers[" + that.data.selected_id + "].height";
    if (that.data.selected_id < 3) {
      that.setData({
        [str1]: 30,
        [str2]: 40
      })
    }
    else {
      that.setData({
        [str1]: 21,
        [str2]: 28
      })
    }
    //改变新图标
    var str3 = "markers[" + id + "].width";
    var str4 = "markers[" + id + "].height";
    that.setData({
      [str3]: 39,
      [str4]: 52
    })
    that.setData({
      selected_id: id,
      selected_ID: that.data.latandlon[id]
    })
    //调用路径生成函数
    var lat = that.data.latandlon[e.target.id % 3].latitude;
    var lon = that.data.latandlon[e.target.id % 3].longitude;
    this.end(lat, lon);
  },
  //点击页面刷新地图
  stapadd: function () {
    var that = this;
    //改变动画标志位
    this.setData({
      animationData: 1//动画开始
    })
    that.dingshiqi3()
    // var lat = that.data.latandlon[0].latitude;
    // var lon = that.data.latandlon[0].longitude;
    // that.end(lat, lon);
    // wx.getLocation({
    //     type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    //     success: function (res) {
    //       // console.log(res);
    //     // console.log(" wx.getLocation:" + res.latitude + "," + res.longitude);
    //       that.setData({
    //         latitude: res.latitude,
    //         longitude: res.longitude,
    //         animationData: 0//结束动画
    //       })
    //       if (that.data.dingshiqiflag == 0) {
    //         that.dingshiqi();
    //         that.dingshiqi2();
    //         that.setData({
    //           lat: res.latitude,
    //           lon: res.longitude
    //         })
    //       }
    //       that.getData();
    //       if (that.data.dingshiqiflag == 1) {
    //         that.getoldmarkes();
    //       }
    //     }
    // })
  },
  //更多
  more: function () {
    // console.log("点击更多");
    wx.navigateTo({
      url: '../classify/classify'
    })
  }, //更多
  add: function () {
    // console.log("点击更多");
    wx.navigateTo({
      url: '../add/add'
    })
  },
  //详情
  detail: function (e) {
    var that = this;
    console.log(that.data.selected_ID);

    if (that.data.selected_ID == 0) {
      that.setData({
        selected_ID: that.data.markers[0]
      });
    }
    if (that.data.selected_ID.ID == 1) {
      wx.navigateTo({
        url: '../detail/detail?sn=' + that.data.selected_ID.sn + '&id=' + that.data.selected_ID.ID
      })
    } else {
      wx.navigateTo({
        url: '../detail/detail?id=' + that.data.selected_ID.ID + '&sn=' + that.data.selected_ID.sn
      })
    }

  },
  daohang: function () {
    var that = this;
    var address = {};
    if (that.data.selected_id == "") {
      address = {
        "latitude": that.data.latandlon[0].latitude,
        "longitude": that.data.latandlon[0].longitude
      };
    } else {
      address = {
        "latitude": that.data.latandlon[that.data.selected_id].latitude,
        "longitude": that.data.latandlon[that.data.selected_id].longitude
      };
    }
    wx.openLocation({
      latitude: that.data.latandlon[that.data.selected_id].latitude,
      longitude: that.data.latandlon[that.data.selected_id].longitude,
      address: address,
      scale: 14
    })
  },
  sousuoClick: function () {
    var that = this;
    wx.navigateTo({
      url: '../map/map?value=' + that.data.sousuo
    })
    // wx.request({
    //   url: 'https://apis.map.qq.com/uri/v1/search?keyword=' + that.data.sousuo+'&referer=OQNBZ-I64RO-MSTWF-SQIKD-PNUHS-XJBQ3',
    //   // url: 'qqmap://map/search?keyword=' + that.data.sousuo +'& region=南充&referer=OQNBZ-I64RO-MSTWF-SQIKD-PNUHS-XJBQ3',
    //   success: function (res) {
    //     console.log(res);
    //   }
    // })
  },
  //时时统计输入到文本框的字符数
  texts_num: function (e) {
    //每一次触发事件都要给出提交按钮的状态标志
    this.setData({
      sousuo: e.detail.value,
    })
  },
})