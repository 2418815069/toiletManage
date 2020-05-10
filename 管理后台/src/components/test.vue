//循环建造标记点
  getData: function() {
    var that=this;
    var tentxunNum=0;
    var numID = 0;
    amapInstance.search({
      keyword: '厕所',
      success: function  (res) {
        for (var k = 0; k < res.data.length; k++) {
          // console.log("详细数据");
          if (res.data[k]._distance <= 1000) {
            tentxunNum++;
            var str = "latandlon[" + k + "]";
            var datas = {
              "sn"      : 1,
              "latitude": res.data[k].location.lat,
              "longitude": res.data[k].location.lng,
              "distance": Math.round(res.data[k]._distance),
              "ID": res.data[k].id
            }
            // that.addmarkert(res.data[k].location.lat, res.data[k].location.lng, res.data[k].id,1);
            that.setData({
              [str]: datas
            })
          }
        }
      },
      fail: function  (res) {
        //  console.log(res);
      },
      complete: function  (res) {
        //拿取自己服务器上面的厕所
        wx.request({
          url: 'http://119.23.237.30/allLavatory?lat=' + that.data.latitude + '&lng=' + that.data.longitude,
          success(resq) {
            if (resq.data.result == 1) {
              resq.data.data = resq.data.data.slice(0, 5);
              for (var i = 0; i < resq.data.data.length; i++) {
                (function (i) {
                    amapInstance.calculateDistance({
                      to: resq.data.data[i].latitude + "," + resq.data.data[i].longitude,
                      success: function (resqu) {
                        var str = "latandlon[" + (tentxunNum + numID) + "]";
                        numID++;
                        if (resqu.result.elements[0].distance) {
                          
                          var datas = {
                            "latitude": resqu.result.elements[0].to.lat,
                            "longitude": resqu.result.elements[0].to.lng,
                            "distance": Math.round(resqu.result.elements[0].distance),
                            "ID": resq.data.data[i].Tencent_ID ? resq.data.data[i].Tencent_ID : 1,
                            "sn": resq.data.data[i].nameID
                          }
                          
                          that.setData({
                            [str]: datas
                          })
                         
                          // that.addmarkert(resqu.result.elements[0].to.lat, resqu.result.elements[0].to.lng, 1, resq.data.data[i].nameID);                   
                        }else{
                          var datas = {
                            "latitude": resqu.result.elements[0].to.lat,
                            "longitude": resqu.result.elements[0].to.lng,
                            "distance": 0,
                            "ID": resq.data.data[i].Tencent_ID ? resq.data.data[i].Tencent_ID : 1,
                            "sn": resq.data.data[i].nameID
                          }

                          that.setData({
                            [str]: datas
                          })
                        }
                      },
                      fail:function(res){
                          console.log(res);
                          numID++;
                      },
                      complete:function(){
                        if (numID == resq.data.data.length){
                          setTimeout(function () {
                            var d;
                            //清除多余的相同的
                     
                            for (var j = 0; j < that.data.latandlon.length; j++){
                              if (that.data.latandlon[j] == undefined){
                                that.data.latandlon.splice(j, j + 1);
                              }
                            }
                            that.setData({
                              latandlon: that.data.latandlon
                            })
                            
                            for (var i = 0; i < that.data.latandlon.length; i++) {
                              for (var k = 0; k < that.data.latandlon.length; k++) {
                                if (i != k && that.data.latandlon[i].ID == that.data.latandlon[k].ID) {
                                  if (that.data.latandlon[i].SN) {
                                    that.data.latandlon.splice(k, k + 1);
                                  }else{
                                    that.data.latandlon.splice(i, i + 1);
                                  }
                                }
                              }
                            }
                            //排序
                            for (var i = 0; i < that.data.latandlon.length; i++) {
                              for (var k = 0; k < that.data.latandlon.length; k++) {
                                if (i != k && that.data.latandlon[i].ID == that.data.latandlon[k].ID){
                                    if (that.data.latandlon[i].SN == 1){
                                      that.data.latandlon.splice(i,i+1)
                                    }
                                  if (that.data.latandlon[k].SN == 1) {
                                    that.data.latandlon.splice(k, k + 1)
                                  }
                                }
                                if (that.data.latandlon[i].distance < that.data.latandlon[k].distance) {
                                  d = that.data.latandlon[i]; that.data.latandlon[i] = that.data.latandlon[k]; that.data.latandlon[k] = d;
                                }
                              }
                            }
                            that.setData({
                              latandlon: that.data.latandlon
                            })
                            
                            //生成标记点
                            for (var j = 0; j < that.data.latandlon.length; j++) {
                              
                              that.addmarkert(that.data.latandlon[j].latitude, that.data.latandlon[j].longitude, that.data.latandlon[j].ID, that.data.latandlon[j].sn, j);
                            }
                            if (that.data.polyline == "") {
                              var lat = that.data.latandlon[0].latitude;
                              var lon = that.data.latandlon[0].longitude;
                              that.end(lat, lon);
                            }
                            //要延时执行的代码
                          }, 1000) //延迟时间 这里是1秒
                        }
                      }

                    });
                })(i)

              }
            }
          }
        });
      }
    })
  },