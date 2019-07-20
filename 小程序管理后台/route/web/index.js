const express=require('express');
const mysql=require('mysql');
const formidable=require('formidable');
const FormData=require('form-data');
const async=require('async');
//操作文件
const path=require('path');
const fs=require('fs');
const request = require("request");
//不用了  只用request
const https = require('https');
const iconv = require("iconv-lite");
const querystring = require('querystring');


var db=mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'smart_city_toilet'});
module.exports=function(){
	router=express.Router();
		//	微信小程序给修理者发保修
		//	每两个小时给更改秘钥	
		
//		定时器   时间2个小时一次
	accessToken();
	setInterval(accessToken,2*60*59*1000);
	function accessToken(){
		var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx60abfae126ee93df&secret=c5ae81408dc6f8d60fcfc599f5703ff0";
		request(url,function(error,res,body){
	//			获取的access_token数据
			    var access_token = JSON.parse(body).access_token;
			    db.query(`UPDATE parameter_table SET access_token='${access_token}'`,(err)=>{
					if(err){
						console.log(err);
					}
				});
		});
	}
	
//	给微信小程序详情页面发送NH3等参数
	router.post('/arguments',(req,res)=>{
		
		var argument = req.body.arguments;
//		db.query(`SELECT*FROM toiletdetails_table WHERE Tencent_ID='${argument}'`,(err,data)=>{
//			if(err){
//				console.log(err);
//				res.status(404).send("i don't no");
//			}else{
//				res.json({'data':data,'result':1});
//			}
//		});
//		先使用一个测试
		async.waterfall([function(callback){
				db.query(`SELECT*FROM toiletDetails_table WHERE Tencent_ID='${argument}'`,(err,data)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{

						callback(null,data);
					}
				});
			},
			function(values,callback){
				//stat 节点的数据
		 		db.query(`SELECT*FROM stat_table WHERE name_ID = '${values[0].male}'`,(err,data)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						values[0].male = data[0];
						db.query(`SELECT*FROM stat_table WHERE name_ID = '${values[0].female}'`,(err,dat)=>{
							if(err){
								console.log(err);
//								res.status(404).send("i don't no");
							}else{
								values[0].female = dat[0];
	                  			callback(null,values);
							}
						});
					}
				});
			},
			function(values,callback){
//				extension数据库
				db.query(`SELECT*FROM extension_table WHERE name_ID = '${values[0].male.extension}'`,(err,data)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						values[0].male.extension = data[0];
						db.query(`SELECT*FROM extension_table WHERE name_ID = '${values[0].female.extension}'`,(err,dat)=>{
							if(err){
								console.log(err);
//								res.status(404).send("i don't no");
							}else{
								values[0].female.extension = dat[0];
	                  			callback(null,values);
							}
						});
					}
				});
			},
			function(values,callback){
//				extension_pit_table	数据库
				db.query(`SELECT*FROM extension_pit_table WHERE name_ID ='${values[0].male.extension.pit_id}'`,(err,data)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						values[0].male.extension.pit_id = data;
						db.query(`SELECT*FROM extension_pit_table WHERE name_ID = '${values[0].female.extension.pit_id}'`,(err,dat)=>{
							if(err){
								console.log(err);
//								res.status(404).send("i don't no");
							}else{
								values[0].female.extension.pit_id = dat;
									
	                  			callback(null,values);
							}
						});
					}
				});
			},
			function(values,callback){
//				extension_pit_table	数据库
				var flag3=0;
				for(var i=0;i<values.length;i++){
					(function(i){
						db.query(`SELECT*FROM extension_pit_table WHERE name_ID ='${values[0].male.extension.urinal_id}'`,(err,data)=>{
							if(err){
								console.log(err);
//								res.status(404).send("i don't no");
							}else{
								values[0].male.extension.urinal_id = data;
								db.query(`SELECT*FROM extension_pit_table WHERE name_ID = '${values[0].female.extension.urinal_id}'`,(err,dat)=>{
									if(err){
										console.log(err);
//										res.status(404).send("i don't no");
									}else{
										values[0].female.extension.urinal_id = dat;
										flag3++;
										if(flag3 == values.length){
			                  				callback(null,values);
										}
									}
								});
							}
						});
					})(i)
				}
			}],function(err,result){
				res.json({'data':result,'result':1});
			});
	});
	
	
	
//	给前面发送access_token
	router.get('/access',(req,res)=>{
		db.query(`SELECT*FROM parameter_table`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					res.json({'data':data,'result':1});
				}
			});
	});
//	保修
	router.post('/baoxiu',(req,res)=>{//添加图片以外的信息
		//保修内容
		var tt='';
		var RepairsPart=req.body[0].repairs;		
		for(var i=0;i<RepairsPart.length;i++){	
			if(i!=RepairsPart.length-1){
				tt+=RepairsPart[i]+'*/*';
			}else{
				tt+=RepairsPart[i];
			}
		}
		 RepairsPart=tt;	
		var nameID=req.body[1].repairid;//保修id
		var repname=req.body[2].repairname;//保修名字
		var site=req.body[3].repairurl;//保修地址
		var reptext=req.body[6].reptext;//保修的文本框内容
		var repflag=req.body[7].repairflag;//是否含有图片
		var replat =req.body[4].lat;		//纬度
		var replng =req.body[5].lng;		//经度;' '
		var wxname=req.body[8].wxuser[0];//拿到微信用户名
		var wxpicture=req.body[8].wxuser[1];//拿到微信图片地址
		var SN = req.body[9].sn;
		var times=new Date();
		var timess=times.toLocaleDateString();//保修年月日
		timess+='*/*'+times.toLocaleTimeString();//是分秒
//		console.log(req.body);
		
		//console.log(RepairsPart,repname,nameID,site,times,reptext,repflag,wxname);
		db.query(`INSERT INTO repairs_table(name,nameID,time,site,description,RepairsPart,tag,weixinName,headphoto,latitude,longitude,SN) VALUE('${repname}','${nameID}','${timess}','${site}','${reptext}','${RepairsPart}','未','${wxname}','${wxpicture}','${replat}','${replng}','${SN}')`,(err,data)=>{
			if(err){
				console.log(err);
//				res.status(500).send("database error").end();
			}else{
				//评价人数放入煮数据表中
				if(nameID=='undefined'){
					nameID = 2;
//					console.log('nameID进来了');
				}
				if(SN=='undefined'){
					SN = 2;
//					console.log('SN进来了');
				}
				db.query(`SELECT*FROM repairs_table WHERE nameID='${nameID}' or SN='${SN}'`,(err,dat)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						db.query(`UPDATE toiletDetails_table SET  warrantyNumber='${dat.length}' WHERE Tencent_ID='${nameID}' or nameID='${SN}'`,(err)=>{
							if(err){
								console.log(err);
//								res.status(404).send("i don't no");
							}else{
								if(repflag==1){//说明还包含图片
									res.json({'data':data});
								}else{
									res.json({'result':1});
								}
							}
						});
					}
				});
			}
		})
//			res.json({'result':1});
	});
	router.post('/baoxiu_img',(req,res)=>{//添加图片的信息
		//创建文件夹函数
		async.waterfall([function(callback){
			fs.exists("C:/Users/Administrator/Desktop/cesuo/static/assets/upimage/"+getFileTime(),function(exists){
				  var retTxt = exists ? retTxt = '文件存在' : '文件不存在';
				 if(retTxt=="文件不存在"){
					 fs.mkdir("C:/Users/Administrator/Desktop/cesuo/static/assets/upimage/"+getFileTime(), function (err) {
						//console.log('创建成功')
						callback(null);
				 	}) 
				 }else{
				 	callback(null);
				 }
			})
		}],function(err,result){
				var form = new formidable.IncomingForm();
				form.encoding = 'utf-8';
		//		form.multiples=true;//设置为多文件上传
		    	form.keepExtensions = true;//保留后缀
		    	form.uploadDir=path.resolve(__dirname,"../../static/assets/upimage/"+getFileTime());
		    	form.parse(req, function(err, fields, files){
		    		//拿到上传
		     		//console.log(files);
		//     		console.log(fields);
		       		//对上传图片做处理
		          	var dir=path.dirname(files.img.path);//获取目录（路径最后一部分不要）
		          	var ext=path.extname(files.img.path);//文件后缀
		          	var old_file_path=files.img.path;
		          	var old_name=files.img.name;
		          	var new_file_path=path.resolve(dir,getCurTime()+old_name);
		          	fs.rename(old_file_path,new_file_path,function(err){
		                if(err)
		                    console.error(err);
		            });//修改名字
		          	//console.log(new_file_path);
		       	 	//数据库存入图片名字
		  			var img_src=getFileTime()+"/"+getCurTime()+old_name;
		  			var c_id=fields.imagesID;
		      		//修改数据库
		      		db.query(`SELECT picture FROM repairs_table where ID=${c_id}`,(err,data)=>{
						if(err){
							console.log(err);
							res.status(404).send("i don't no");
						}else{
							if(data[0].picture==null){
								//console.log("没有图片")
								db.query(`UPDATE repairs_table SET picture='${img_src}' where ID=${c_id}`,(err,data)=>{
									if(err){
										console.error(err);
										res.status(500).send('database error').end();
									}else{
										res.json(2)
									}
								});
							}else{
								img_src=data[0].picture+'*/*'+img_src;
								//console.log(img_src);
								db.query(`UPDATE repairs_table SET picture='${img_src}' where ID=${c_id}`,(err,data)=>{
									if(err){
										console.error(err);
//										res.status(500).send('database error').end();
									}else{
										res.json(2)
									}
								});
							}
						}
					});
		    });
		});
		
		
	});
		//	增加厕所
	router.post('/add',(req,res)=>{//添加图片以外的信息
		var data_all = req.body;
		var random = '';
		async.waterfall([function(callback){
			for (var i = 0; i < 15; i++) {
		      random += Math.floor(Math.random() * 10);
		  	}
			if(data_all.sn == 0 && data_all.Tencent_ID.length == 0){
			db.query(`SELECT*FROM toiletDetails_table WHERE Tencent_ID='${random}'`,(err,data)=>{
				if(err){
					console.log(err);
	//					res.status(404).send("i don't no");
				}else{
//					console.log("1")
					if(data==""){
						FN = 0;
						callback(null);
					}else{
						for (var i = 0; i < 15; i++) {
					      random += Math.floor(Math.random() * 10);
					    }
						callback(null);
					}
				}
			});

			}else if(data_all.sn == 0 && data_all.Tencent_ID.length != 0){
				callback(null);
			}else{
				db.query(`SELECT*FROM toiletDetails_table WHERE nameID='${data_all.sn}'`,(err,data)=>{
					if(err){
						console.log(err);
		//					res.status(404).send("i don't no");
					}else{
						if(data==""){//创建完整的链表
							var yn=0;
							yn = establish(data_all.sn);
							setTimeout(function(){
								callback(null);
							},200);		
						}else{
							callback(null);
						}
					}
				});
			}
		}],function(err,result){
			if(data_all.sn == 0 && data_all.Tencent_ID.length == 0){
				db.query(`INSERT INTO toiletDetails_table(name,nameID,HealthStar,site,Tencent_ID,latitude,longitude) VALUES
				 ('${data_all.name}','${0}','${3}','${data_all.site}','${random}','${data_all.latitude}','${data_all.longitude}')`,(err,data)=>{
                    if(err){
                        console.log(err);	
                    }else{
//                  	console.log(2);
                        res.json({'result':1,'data':random});
                    }
                });
			}else if(data_all.sn == 0 && data_all.Tencent_ID.length != 0){
				db.query(`INSERT INTO toiletDetails_table(name,nameID,HealthStar,site,Tencent_ID,latitude,longitude) VALUES
				 ('${data_all.name}','${0}','${3}','${data_all.site}','${data_all.Tencent_ID}','${data_all.latitude}','${data_all.longitude}')`,(err,data)=>{
                    if(err){
                        console.log(err);	
                    }else{
//                  	console.log(2);
                        res.json({'result':1,'data':data_all.Tencent_ID});
                    }
                });
			}else if(data_all.sn != 0 && data_all.Tencent_ID.length == 0){
				db.query(`UPDATE toiletDetails_table SET name='${data_all.name}',site='${data_all.site}',warrantyNumber='${0}',LikeNumber='${0}',tauntNumber='${0}',
				Tencent_ID='${random}',latitude='${data_all.latitude}',longitude='${data_all.longitude}',HealthStar='${5}' WHERE nameID='${data_all.sn}'`,(err,data)=>{
					if(err){
						console.log(err);
	//					res.status(404).send("i don't no");
					}else{
						res.json({'result':1,'data':random});
					}
				});
			}else{
				db.query(`UPDATE toiletDetails_table SET name='${data_all.name}',site='${data_all.site}',warrantyNumber='${0}',LikeNumber='${0}',tauntNumber='${0}',
				Tencent_ID='${data_all.Tencent_ID}',latitude='${data_all.latitude}',longitude='${data_all.longitude}',HealthStar='${5}' WHERE nameID='${data_all.sn}'`,(err,data)=>{
					if(err){
						console.log(err);
	//					res.status(404).send("i don't no");
					}else{
						res.json({'result':1,'data':data_all.Tencent_ID});
					}
				});
			}
		});
	});
	router.post('/add_img',(req,res)=>{//厕所的街景图
		//创建文件夹函数 （不需要）
//		console.log("进来了");
		async.waterfall([function(callback){
				 	callback(null);
		}],function(err,result){
				var form = new formidable.IncomingForm();
				form.encoding = 'utf-8';
		//		form.multiples=true;//设置为多文件上传
		    	form.keepExtensions = true;//保留后缀
		    	form.uploadDir=path.resolve(__dirname,"../../static/headerPicture");
		    	form.parse(req, function(err, fields, files){
		    		//拿到上传
		     		//console.log(files);
		//     		console.log(fields);
		       		//对上传图片做处理
		          	var dir=path.dirname(files.img.path);//获取目录（路径最后一部分不要）
		          	var ext=path.extname(files.img.path);//文件后缀
		          	var old_file_path=files.img.path;
		          	var old_name=files.img.name;
		          	var new_file_path=path.resolve(dir,getCurTime()+old_name);
		          	fs.rename(old_file_path,new_file_path,function(err){
		                if(err)
		                 console.error(err);
		            });//修改名字
		          	//console.log(new_file_path);
		       	 	//数据库存入图片名字
		  			var img_src=getCurTime()+old_name;
		  			var c_id=fields.imagesID;
		  			
		      		//修改数据库
		      		db.query(`SELECT picture FROM toiletDetails_table where Tencent_ID='${c_id}'`,(err,data)=>{
						if(err){
							console.log(err);
							res.status(404).send("i don't no");	
						}else{
							db.query(`UPDATE toiletDetails_table SET picture='${img_src}' where Tencent_ID=${c_id}`,(err,data)=>{
								if(err){
									console.error(err);
//									res.status(500).send('database error').end();
								}else{
									res.json(2)
								}
							});
						}
					});
		    });
		});
		
		
	});
	
	
	
	router.get("/jingquName",(req,res)=>{
		db.query(`Select*from parameter_table`,(err,data)=>{
			if(err){
				console.log(err);
//				res.status(500).send('database error').end();
			}else if(data[0]==null){
				res.json({"result":-1})
			}else{
				res.json({
					'data' : data
				});
			}
		})
	});
	
	
	//评论页面设置
	router.post("/tease",(req,res)=>{
		var rease = req.body; 
		 db.query(`INSERT INTO evaluate_table(username,nameID,HealthStar,time,evaluate,headphoto,site,name,SN) VALUES 
		('${rease.username}','${rease.nameID}','${rease.HealthStar}','${rease.time}','${rease.evaluate}','${rease.headphoto}','${rease.site}','${rease.name}','${rease.sn}')`,(err,data)=>{
            if(err){
               console.log(err); 
//             res.status(500).send('database error').end();
            }else{
            	if(rease.nameID=='undefined'){
            		rease.nameID=1;
            	}
            	if(rease.sn == 'undefined'){
            		rease.sn = 1;
            	}
            	db.query(`SELECT*FROM evaluate_table WHERE nameID='${rease.nameID}' or SN='${rease.sn}'`,(err,dat)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						db.query(`UPDATE toiletDetails_table SET  LikeNumber='${dat.length}' WHERE Tencent_ID='${rease.nameID}' or nameID='${rease.sn}'`,(err)=>{
							if(err){
								console.log(err);
//								res.status(404).send("i don't no");
							}else{
								res.json({'result':1});
							}
						});
					}
				});
            }
        });  
	});
	
	//验证详情页中的是否有腾讯的ID设置
	router.post("/verify",(req,res)=>{
		var Tencent_ID = req.body.Tencent_ID; 
		db.query(`Select*from toiletDetails_table WHERE Tencent_ID = '${Tencent_ID}' `,(err,data)=>{
			if(err){
				console.log(err);
//				res.status(500).send('database error').end();
			}else if(data[0]==null){
				res.json({"result":-1})
			}else{
				res.json({
					'data' 	: data,
					"result": 1
				});
			}
		})
	});
	//验证详情页中的是否有腾讯的ID设置
	router.post("/verifySN",(req,res)=>{
		var sn = req.body.sn; 
		db.query(`Select*from toiletDetails_table WHERE nameID ='${sn}'`,(err,data)=>{
			if(err){
				console.log(err);
//				res.status(500).send('database error').end();
			}else{
				res.json({
					'data' 	: data,
					"result": 1
				});
			}
		})
	});
	
	//在首页获取推荐的厕所人数
	router.post("/allnumber",(req,res)=>{
		var allnumber = req.body.allnumber;
		var flags = 0;
		var allnumbers=[];
		if(allnumber==""){
			res.json({
				"result": 0
			});
		}
		for(var i=0;i<allnumber.length;i++){
			(function(i){
				db.query(`Select*from toiletDetails_table WHERE Tencent_ID = '${allnumber[i].id}' `,(err,data)=>{
					if(err){
						console.log(err);
//						res.status(500).send('database error').end();
					}else{
						flags++;
						allnumbers.push(data);
						if(flags == allnumber.length){
//							console.log(allnumbers);
							res.json({
								'data' : allnumbers,
								"result": 1
							});
						}
						
					}
				});
			})(i)
		}
		
	});
	//验证详情页中的是否有腾讯的ID设置
	router.get("/allLavatory",(req,res)=>{
			var latCenter = req.query.lat;
			var lngCenter = req.query.lng;
			db.query(`Select*from toiletDetails_table`,(err,data)=>{
				if(err){
					console.log(err);
	//				res.status(500).send('database error').end();
				}else if(data[0]==null){
					res.json({"result":-1})
				}else{
					var Main =[];
					for(var i=0;i<data.length;i++){
						if(data[i].latitude){
							Main.push(data[i]);
						}
					}
					for(var j=0;j<Main.length;j++){
						// 调用 return的距离单位为km
						Main[j].distant = GetDistance(latCenter,lngCenter,Main[j].latitude,Main[j].longitude)*1000;
					}
					Main = Main.sort(getSortFun('desc', 'distant'));
					function getSortFun(order, sortBy) {
					    var ordAlpah = (order == 'asc') ? '<' : '>';
					    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
					    return sortFun;
					}
					// Main = Main.slice(0,5);
					//Main.name_ID
					
					// var dataAll=[];//存放所有数据
					// var biaos=0;
					// for(var t=0;t<Main.length;t++){
					// 	dataAll.push([]);
					// 	console.log(Main[t].nameID)
					// 	for(var i=1;i<4;i++){
					// 		//dataAll[t].push({})
					// 		if(i==1){
					// 			dataAll[t].manK=[]
					// 		}else if(i==2){
					// 			dataAll[t].manD=[]
					// 		}else{
					// 			dataAll[t].womanK=[]
					// 		}
					// 		(function(s,w){
					// 			var sqls=returnSql(s,Main[t].nameID)
					// 			db.query(``+sqls+``,(err,data)=>{
					// 				biaos++
					// 				if(err){
					// 					console.log(err)
					// 				}else{
					// 					if(s==1){
					// 						dataAll[w].manK.push(data)
					// 					}else if(s==2){
					// 						dataAll[w].manD.push(data)
					// 					}else{
					// 						dataAll[w].womanK.push(data)
					// 					}
					// 					//数据处理
					// 					if(biaos==3*Main.length){
					// 						console.log(dataAll);
					// 					}
					// 				}
					// 			})
					// 		})(i,t)
					// 	}
					// }
					res.json({
						'data' 	: Main,
						"result": 1
					});
				}
			})

	});
	
		//查找SN的总人数和等待人数
	router.post("/personnel",(req,res)=>{
		var sn = req.body.sn;
		var flag = 0; 
		for (var i = 0; i < sn.length; i++) {
			(function(i){
				flag++;
				db.query(`SELECT staya,count(*) as pitNum from stat_table,extension_pit_table WHERE stat_table.name_ID ='${sn[i].sn+"1"}' AND extension_pit_table.name_ID='${sn[i].sn+"111"}'`,(err,data)=>{
					if(err){
						console.log(err);
					}else{
						sn[i].male = {"staya":data.staya,"pitNum":data.pitNum};
						db.query(`SELECT staya,count(*) as pitNum from stat_table,extension_pit_table WHERE stat_table.name_ID ='${sn[i].sn+"2"}' AND extension_pit_table.name_ID='${sn[i].sn+"211"}'`,(err,data)=>{
							if(err){
								console.log(err);
							}else{
								sn[i].female = {"staya":data.staya,"pitNum":data.pitNum};
								if(flag==sn.length){
									res.json({"result":1,"data":sn});
								}
							}
						});
						
					}
				});
			})(i)
		}
		db.query(`Select*from toiletDetails_table WHERE nameID ='${sn}'`,(err,data)=>{
			if(err){
				console.log(err);
//				res.status(500).send('database error').end();
			}else{
				res.json({
					'data' 	: data,
					"result": 1
				});
			}
		})
	});
	
	
	
	//跳转到其他页面
	router.use('/hardware',require('./hardware')()) ;//接受数据，储存数据
	
	
	return router;
}

//生成文件夹函数
function mackFile(){
	fs.exists("C:/Users/Administrator/Desktop/cesuo/static/assets/upimage/"+getFileTime(),function(exists){
		  var retTxt = exists ? retTxt = '文件存在' : '文件不存在';
     	  //console.log(retTxt);
		 if(retTxt=="文件不存在"){
			 fs.mkdir("C:/Users/Administrator/Desktop/cesuo/static/assets/upimage/"+getFileTime(), function (err) {
				//console.log('创建成功')
		 	}) 
		 }
	})
		
}
//两个坐标之间的距离计算
function GetDistance( lat1,  lng1,  lat2,  lng2){
    var radLat1 = lat1*Math.PI / 180.0;
    var radLat2 = lat2*Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
    Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
}
//创建时间给图片面名
function getCurTime(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	month=month>9?month:'0'+month;
	var day=date.getDate();
	day=day>9?day:'0'+day;
	var hour=date.getHours();
	hour=hour>9?hour:'0'+hour;
	var minute=date.getMinutes();
	minute=minute>9?minute:'0'+minute;
	var second=date.getSeconds();
	second=second>9?second:'0'+second;
	return year+''+month+day+hour+minute+second;
}
//创建时间给文件夹命名
function getFileTime(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	month=month>9?month:'0'+month;
	var day=date.getDate();
	day=day>9?day:'0'+day;
	return year+''+month+day;
}





//厕所添加
 function toiletDetails(toilet,nameID,numbe,values){ 
        //厕所名称，厕所ID,厕所ID所加的后标,厕所的用的数据
            if(values != undefined){
                 //厕所
                db.query(`UPDATE toiletDetails_table SET ${toilet}='${nameID+numbe}' WHERE nameID='${nameID}'`,(err,data)=>{
                    if(err){
                        console.log(err);
                    }else{
                       for(var i in values){
                            stat(i,nameID+numbe,values[i]);
                       }
                    }
                });
            }
        }


        function stat(toilet_stat,nameID,values){    //名称,每个种厕所的ID,所需数据
            if(values != undefined){
                if(toilet_stat == 'extension'){
                    db.query(`UPDATE stat_table SET ${toilet_stat}='${nameID+1}' WHERE name_ID='${nameID}'`,(err,data)=>{
                        if(err){
                            console.log(err);
                        }else{
                            for(var i in values){
                                extension(i,nameID+1,values[i]);
                            }
                        }
                    });
                }else{
                    db.query(`UPDATE stat_table SET ${toilet_stat+'a'}='${values}' WHERE name_ID='${nameID}'`,(err,data)=>{
                        //这里加a是因为MySQL的特殊字符有冲突
                        if(err){
                            console.log(err);
                        }else{
                              return 0;    
                        }
                    });
                }
            }      
        }


        function extension(toilet_stat_exten,nameID,values){ 
        	
        	
        	
                        //名称,每个种厕所的ID,所需数据
            if(values != undefined){
                if(toilet_stat_exten == "NH3" || toilet_stat_exten == "temperature" || toilet_stat_exten == "humidity"){
                    db.query(`UPDATE extension_table SET ${toilet_stat_exten}='${values}' WHERE name_ID='${nameID}'`,(err,data)=>{
                        if(err){
                            console.log(err);
                        }else{
                            return 0;
                        }
                    });
                }else{
                	
                    if (toilet_stat_exten.slice(0,1)=='p') {
                        db.query(`UPDATE extension_table SET pit_id='${nameID+1}' WHERE name_ID='${nameID}'`,(err,data)=>{
                            if(err){
                                console.log(err);
                            }else{
                                extension_pit(toilet_stat_exten.slice(4),nameID+1,values);
                            }
                        });
                    }else{
                         db.query(`UPDATE extension_table SET urinal_id='${nameID+2}' WHERE name_ID='${nameID}'`,(err,data)=>{
                            if(err){
                                console.log(err);
                            }else{
                                extension_pit(toilet_stat_exten.slice(7),nameID+2,values);
                            }
                        });
                    }
                    
                }
            }
        }

        function extension_pit(pit_numbe_id,nameID,values){
                            // 后五位的ID,上一级的标志id,值
            db.query(`SELECT * FROM extension_pit_table WHERE name_ID='${nameID}' and toiletDetails_ID=${pit_numbe_id}`,(err,dat)=>{
                if(err){
                    console.log(err);
                }else{
                    if(dat==""){
                        db.query(`INSERT INTO extension_pit_table(name_ID,toiletDetails_ID,pit_condition) VALUES ('${nameID}','${pit_numbe_id}','${values}')`,(err,data)=>{
                            if(err){
                                console.log(err);	
                            }else{
                                return 1;
                            }
                        });
                    }else{
                        db.query(`UPDATE extension_pit_table SET pit_condition='${values}' WHERE name_ID='${nameID}' and toiletDetails_ID=${pit_numbe_id}`,(err,data)=>{
                            if(err){
                                console.log(err);
                            }else{
                                return 1;
                            }
                        });
                    }
                }
            }); 
           
        }

        function establish(nameID){ //创建完整的数据链表,只通过data.sn
        	async.waterfall([function(callback){
        		db.query(`INSERT INTO toiletDetails_table(nameID,male,female,third,unisex) VALUES ('${nameID}','${nameID+"1"}','${nameID+"2"}','${nameID+"3"}','${nameID+"4"}')`,(err,data)=>{
                     if(err){
                        console.log(err);
                    }else{
//                  	console.log(1);
                       callback(null);
                    }
                });
        	},function(callback){
        		 var flag=1;
                for(var i=1;i<5;i++){ 
                    (function(i){
                        db.query(`INSERT INTO stat_table(name_ID,extension) VALUES ('${nameID+i}','${nameID+i+"1"}')`,(err,data)=>{
                            if(err){
                            console.log(err);
                            }else{
                                flag++;
                                if(flag == 5){
//                              	console.log(2);
                                    callback(null);
                                }
                            }
                        })     
                    })(i)
                }
        	}],function(err,result){
        		var flag1=1; 
                 for(var i=1;i<5;i++){
                    (function(i){
                        db.query(`INSERT INTO extension_table(name_ID,pit_id,urinal_id) VALUES ('${nameID+i+"1"}','${nameID+i+"1"+"1"}','${nameID+i+"1"+"2"}')`,(err,data)=>{
                            if(err){
                            console.log(err);
                            }else{
                                flag1++;
                                if(flag1 == 5){
//                              	console.log(3);
                                 	return 1;
                                }
                            }
                        })     
                    })(i)
                }   
        	});
//          var promise=new Promise(function(resolve,reject){
//              db.query(`INSERT INTO toiletDetails_table(nameID,male,female,third,unisex) VALUES ('${nameID}','${nameID+"1"}','${nameID+"2"}','${nameID+"3"}','${nameID+"4"}')`,(err,data)=>{
//                   if(err){
//                      console.log(err);
//                  }else{
//                     resolve();
//                  }
//              });
//          }).then(function(){
//              var flag=1;
//              for(var i=1;i<5;i++){ 
//                  (function(i){
//                      db.query(`INSERT INTO stat_table(name_ID,extension) VALUES ('${nameID+i}','${nameID+i+"1"}')`,(err,data)=>{
//                          if(err){
//                          console.log(err);
//                          }else{
//                              flag++;
//                              if(flag == 5){
//                                  return new Promise(resolve => {
//                                      resolve();
//                                  });
//                              }
//                          }
//                      })     
//                  })(i)
//              }
//          }).then(function(){
//              var flag1=1; 
//               for(var i=1;i<5;i++){
//                  (function(i){
//                      db.query(`INSERT INTO extension_table(name_ID,pit_id,urinal_id) VALUES ('${nameID+i+"1"}','${nameID+i+"1"+"1"}','${nameID+i+"1"+"2"}')`,(err,data)=>{
//                          if(err){
//                          console.log(err);
//                          }else{
//                              flag1++;
//                              if(flag1 == 5){
//                               	return 1;
//                              }
//                          }
//                      })     
//                  })(i)
//              }   
//          });
        }







  //返回sql语句，一共包含3条语句，
  //1，男生，坑位
  //2，男生，尿斗
  //3，女生，坑位
  function returnSql(flags,nameID){//传入状态位
  	var getsql='';
  	if(flags==1){
  		getsql=`SELECT toiletdetails_table.nameID,HealthStar,picture,site,longitude,latitude,toiletdetails_table.Tencent_ID,ina,outa,staya,NH3,temperature,humidity,toiletDetails_ID, pit_condition
  		 		FROM toiletdetails_table,stat_table,extension_table,extension_pit_table
  		  		WHERE toiletdetails_table.nameID='`+nameID+`'
  		  		AND toiletdetails_table.male=stat_table.name_ID  
  		  		AND stat_table.extension=extension_table.name_ID
				AND extension_table.pit_id=extension_pit_table.name_ID`
  	}else if(flags==2){
  		getsql=`SELECT toiletdetails_table.nameID,HealthStar,picture,site,longitude,latitude,toiletdetails_table.Tencent_ID,ina,outa,staya,NH3,temperature,humidity,toiletDetails_ID, pit_condition
  		 		FROM toiletdetails_table,stat_table,extension_table,extension_pit_table
  		  		WHERE toiletdetails_table.nameID='`+nameID+`'
  		  		AND toiletdetails_table.male=stat_table.name_ID 
  		  		AND stat_table.extension=extension_table.name_ID
				AND extension_table.urinal_id=extension_pit_table.name_ID`
  	}else{
  		getsql=`SELECT toiletdetails_table.nameID,HealthStar,picture,site,longitude,latitude,toiletdetails_table.Tencent_ID,ina,outa,staya,NH3,temperature,humidity,toiletDetails_ID, pit_condition
  		 		FROM toiletdetails_table,stat_table,extension_table,extension_pit_table
  		  		WHERE toiletdetails_table.nameID='`+nameID+`'
  		  		AND toiletdetails_table.female=stat_table.name_ID 
  		  		AND stat_table.extension=extension_table.name_ID
				AND extension_table.pit_id=extension_pit_table.name_ID`
  	}
  	return getsql;
  }