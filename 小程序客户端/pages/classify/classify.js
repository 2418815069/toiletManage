const app = getApp()
var request = require('../../utils/request.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var amapInstance;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    detid: '',
    lists:[]
    // lists: [{ lat: 39.5128, lon: 116.75065  , id: 1, address: '', distance: '', Wnum: '3', Mnum:'3',Cnum: '2'}, 
    //   { lat: 39.5228, lon: 116.74065,id: 2, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' },
    //   { lat: 39.5328, lon: 116.74065, id: 3, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' },
    //   { lat: 39.5428, lon: 116.77065, id: 3, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' },
    //   { lat: 39.5528, lon: 116.76065, id: 3, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' },
    //   { lat: 39.5628, lon: 116.75065, id: 3, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' },
    //   { lat: 39.5728, lon: 116.78065, id: 3, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' },
    //   { lat: 39.5828, lon: 116.77065, id: 3, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' },
    //   { lat: 39.5928, lon: 116.78065, id: 3, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' },
    //   { lat: 39.5228, lon: 116.72065, id: 3, address: '', distance: '', Wnum: '3', Mnum: '3', Cnum: '2' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dingshiqi();
    var that = this;
    var lat;
    var lon;
    amapInstance = new QQMapWX({
      key: 'L6FBZ-YQ4CG-URYQY-IH36I-SXRFZ-IEBI5' //此处使用你自己申请的key
    })   

  //   //地址
  //   function adr(i, length) {
  //     if (++i < length) {
  //       lat = that.data.lists[i].lat
  //       lon = that.data.lists[i].lon
  //       //console.log(lat)
  //       //console.log(lon)
  //       //地址描述
  //       amapInstance.reverseGeocoder({
  //         location: {
  //           latitude: lat,
  //           longitude: lon
  //         },
  //         success: function (res) {
  //           //console.log(res);
  //           var addresss = "lists[" + i + "].address";
  //           that.setData({
  //             [addresss]: res.result.address
  //           })
  //           //console.log(res.result.address)
  //           adr(i, length);
  //         },
  //         fail: function (res) {
  //           //console.log(res);

  //         },
  //         complete: function (res) {
  //           //console.log(res);
  //         }
  //       })

  //     }
  //   }

  //   //距离
  // function dis(z, length) {
  //     if (++z < length) {
  //       lat = that.data.lists[z].lat
  //       lon = that.data.lists[z].lon
  //       //console.log(lat)
  //       //console.log(lon)
  //       //距离
  //       amapInstance.calculateDistance({
  //         to: [{
  //           latitude: lat,
  //           longitude: lon
  //         }, {
  //           latitude: lat,
  //           longitude: lon
  //         }],
  //         success: function (res) {
  //           var distances = "lists[" + z + "].distance";
  //           that.setData({
  //             [distances]: res.result.elements[0].distance
  //           })
  //           //console.log(res.result.elements[0].distance)
  //           // paixu();
  //           if (z+1 == length) {
  //             //paixu();
  //           }
  //           dis(z, length);
  //           //距离排序
            
  //         },
  //         fail: function (res) {
  //           //console.log(res);

  //         },
  //         complete: function (res) {
  //           //console.log(res);
  //         }
  //       })

  //     }
  //   }
  //   adr(-1, that.data.lists.length);
  //   dis(-1, that.data.lists.length);
  //   function paixu(){
  //     for (var i = 0; i < that.data.lists.length;i++){
  //       for (var z = i+1; z < that.data.lists.length;z++){
  //             if(that.data.lists[i].distance>that.data.lists[z].distance){
  //              var c=that.data.lists[i];
  //               that.data.lists[i]=that.data.lists[z]
  //               that.data.lists[z]=c;
  //               //console.log(i+z)
  //             }
  //           }
  //      }
  //   }
    
      //微信服务器是异步的，导致赋值很难。。。
    
  },
  dingshiqi:function() {
    var that = this;
    var list1 = [];
    var num = this.data.lists.length;
    for (var k = 0; k < num; k++) {
      var list2 = this.data.lists[k];
      list2.Wnum = Math.floor(Math.random() * 5);
      list2.Mnum = Math.floor(Math.random() * 5);
      list2.Cnum = 0;
      list1.push(list2);
    }
    that.setData({
      lists: list1
    })
    console.log(lists);
    setTimeout(function () {
      that.dingshiqi()
    }, 3000)
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
  

  //地址
  adr:function(i,length){
    if (++i < length) {
      lat = that.data.lists[x].lat
      lon = that.data.lists[x].lon
      //console.log(lat)
      //console.log(lon)
      //地址描述
      amapInstance.reverseGeocoder({
        location: {
          latitude: lat,
          longitude: lon
        },
        success: function (res) {
              // console.log(res);
              var addresss = "lists[" + z + "].address";
              that.setData({
                [addresss]: res.result.address
              })
              //console.log(res.result.address)
          adr(i, length);
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
  
  //周边地址获取
  onShow: function () {
    var that = this;
    //that.getData();
    amapInstance.search({
      keyword: '厕所',
      success: function  (res) {
        console.log('rrr,',res.data);
        for(var i=0;i<res.data.length;i++){
         if(res.data[i]._distance<1000){
           res.data[i]._distance = parseInt(res.data[i]._distance)
           var addresss = "lists[" + i + "]";
           that.setData({
             [addresss]:res.data[i]
           })
         }else{
           return
         }
        }
      },
      fail: function  (res) {
        //console.log(res);
      },
      complete: function  (res) {
        //console.log(res);
      }
    })
  },



  //距离
  dis:function(z,length){
    if (++z < length) {
      lat = that.data.lists[x].lat
      lon = that.data.lists[x].lon
      //console.log(lat)
      //console.log(lon) 
      //距离
      amapInstance.calculateDistance({
        to: [{
          latitude: lat,
          longitude: lon
        }, {
          latitude: lat,
          longitude: lon
        }],
        success: function (res) {
              var distances = "lists[" + y + "].distance";
              that.setData({
                [distances]: res.result.elements[0].distance
              })
              //console.log(res.result.elements[0].distance)
          dis(z, length);
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
  openmap: function (event) {
    var id = event.target.dataset.id;
    var lat = event.target.dataset.lat;
    var lng = event.target.dataset.lng;
    var address = event.target.dataset.address;
    var that = this;
    // 调用腾讯接口
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      address: address,
      scale: 14
    })
  },

})