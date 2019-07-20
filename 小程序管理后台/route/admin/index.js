const express=require('express');
const mysql=require('mysql');
const async=require('async');

var db=mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'smart_city_toilet'});
module.exports=function(){
		router=express.Router();
		router.get('/',(req,res)=>{
			if(!req.session.login){
				res.redirect('/admin/login');
			}else{
				res.render('admin/index.html',{});
			}
		});
		router.get('/login',(req,res)=>{
			res.render('admin/login.html',{});
		});
		router.post('/login',(req,res)=>{
			var account = req.body.account;
			var password = req.body.password;
			
			db.query(`SELECT*FROM Administrator_table WHERE Account='${account}'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					if(data[0]){
						if(data[0].password == password){
							req.session.account=data[0].account;	
		 	 				req.session.password = data[0].password;
		 	 				req.session.name = data[0].name;
		 	 				req.session.login = true;
							res.json({'result':2});
						}else{
							res.json({'result':1});
						}
					}else{
						res.json({'result':0});
					}
					
				}
			});
		});
		router.get('/exit',(req,res)=>{
			req.session.account="";	
			req.session.password = "";
			req.session.name = "";
			req.session.login = false;
			res.json({'result':1});
		});
		router.get('/session',(req,res)=>{
			res.json({'result':1,'name':req.session.name});
		});
//		index1界面的路由
		router.get('/index1',(req,res)=>{
			var page = req.query.page;
			if(page==undefined){
				page=1;
			}
			db.query(`SELECT*FROM repairs_table  WHERE tag='未'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					var pageAll=data.length;
					data.reverse();
					if(data.length/10+1>page){
						if(page==1){
							data = data.slice(0,20);
						}else{
							data = data.slice(10*page-10,10*(page+1));
						}
					}else{
						data = data.slice(0,20);
					}
					res.json({'data':data,'result':1,'page':pageAll});
				}
			});
		});
		router.post('/index1',(req,res)=>{
			var page = req.body.page;
			if(page==undefined){
				page=1;
			}
			db.query(`SELECT*FROM repairs_table  WHERE tag='未'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					var pageAll=data.length;
					if(page==1){
						data = data.slice(-20);
					}else{
						data = data.slice(-10*page-10,-10*(page-1));
					}
					data.reverse();
					res.json({'data':data,'result':1,'page':pageAll});
				}
			});
		});
		router.post('/index2Details',(req,res)=>{
			 var idx = req.body.ID;
			db.query(`SELECT*FROM repairs_table WHERE ID='${idx}'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					res.json({'data':data,'result':1});
				}
			});
		});
		router.post('/alltag',(req,res)=>{
			db.query(`UPDATE repairs_table SET tag='已'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					res.json({'result':1});
				}
			});
		});
		router.post('/atag',(req,res)=>{
			var atag = req.body.atag;
			var flag=0;
			for(var i=0;i<atag.length;i++){
				(function(i){
					flag++;
					db.query(`UPDATE repairs_table SET tag='${atag[i].tag}' WhERE ID='${atag[i].ID}'`,(err,data)=>{
						if(err){
							console.log(err);
//							res.status(404).send("i don't no");
						}else{
							if(flag==atag.length-1){
								res.json({'result':1});
							}
						}
					});
				})(i)
			}
		});
		router.post('/index2/save',(req,res)=>{
			var save = req.body.save;
			db.query(`UPDATE repairs_table SET tag='${save.tag}' WhERE ID='${save.ID}'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					res.json({'result':1});
				}
			});
		});
		router.post('/history',(req,res)=>{
			var page = req.body.page;
			if(page==undefined){
				page=1;
			}
			db.query(`SELECT*FROM repairs_table WHERE tag='已'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					var pageAll=data.length;
					if(page==1){
						data = data.slice(-20);
					}else{
						data = data.slice(-10*page-10,-10*(page-1));
					}
					data.reverse();
					res.json({'data':data,'result':1,'page':pageAll});
				}
			});
		});
		router.post('/sousuo',(req,res)=>{
			var idw = req.body.data;
			db.query(`SELECT*FROM repairs_table WHERE time LIKE '%${idw}%' or site LIKE '%${idw}%' or RepairsPart LIKE '%${idw}%'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					
					res.json({'data':data,'result':1});
				}
			});
		});
//		index2界面的路由
		router.get('/index2',(req,res)=>{
			db.query(`SELECT*FROM toiletDetails_table`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					res.json({'data':data,'result':1});
				}
			});
		});
//		index3界面的路由
		router.get('/index3',(req,res)=>{
			var pageAll;

			async.waterfall([function(callback){
				var page = req.query.page;
				
				if(page==undefined){
					page=1;
				}
				db.query(`SELECT*FROM toiletDetails_table`,(err,data)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						
						for(var i=0;i<data.length;i++){
							if(data[i].Tencent_ID == null){
								data.splice(i,1);
								i--;
							}
						}
						pageAll=data.length;
						data.reverse();
						if(data.length/10+1>page){
							if(page==1){
								data = data.slice(0,20);
							}else{
								data = data.slice(10*page-10,10*(page+1));
							}
						}else{
							data = data.slice(0,20);
						}
						// console.log(data)
						callback(null,data);
					}
				});
			},
			function(values,callback){
				//stat 节点的数据
				var flag = 0;

				 for(var i=0; i<values.length;i++){
				 	(function(i){
				 		if(values[i].nameID==0){
				 			flag++;
			 				if(flag == values.length){
                  				callback(null,values)
							}
				 		}else{
				 			db.query(`SELECT*FROM stat_table WHERE name_ID = '${values[i].male}'`,(err,data)=>{
								if(err){
									console.log(err);
	//								res.status(404).send("i don't no");
								}else{
									values[i].male = data[0];
									db.query(`SELECT*FROM stat_table WHERE name_ID = '${values[i].female}'`,(err,dat)=>{
										if(err){
											console.log(err);
	//										res.status(404).send("i don't no");
										}else{
											values[i].female = dat[0];
											flag++;
											if(flag == values.length){
				                  				callback(null,values)
											}
										}
									});
								}
							});
				 		}
				 		
				 	})(i)
				 }
			},
			function(values,callback){
//				extension数据库
				var flag1=0;
				for(var i=0;i<values.length;i++){
					(function(i){
						if(values[i].nameID==0){
				 			flag1++;
			 				if(flag1 == values.length){
                  				callback(null,values)
							}
				 		}else{
					 		db.query(`SELECT*FROM extension_table WHERE name_ID = '${values[i].male.extension}'`,(err,data)=>{
								if(err){
									console.log(err);
	//								res.status(404).send("i don't no");
								}else{
									values[i].male.extension = data[0];
									db.query(`SELECT*FROM extension_table WHERE name_ID = '${values[i].female.extension}'`,(err,dat)=>{
										if(err){
											console.log(err);
	//										res.status(404).send("i don't no");
										}else{
											values[i].female.extension = dat[0];
											flag1++;
											if(flag1 == values.length){
				                  				callback(null,values);
											}
										}
									});
								}
							});	
				 		}
					
					})(i)
				}
			},
			function(values,callback){
//				extension_pit_table	数据库
				var flag2=0;
				for(var i=0;i<values.length;i++){
					(function(i){
						if(values[i].nameID==0){
				 			flag2++;
			 				if(flag2 == values.length){
	              				callback(null,values)
							}
				 		}else{
				 			db.query(`SELECT*FROM extension_pit_table WHERE name_ID ='${values[i].male.extension.pit_id}'`,(err,data)=>{
								if(err){
									console.log(err);
	//								res.status(404).send("i don't no");
								}else{
									values[i].male.extension.pit_id = data;
									db.query(`SELECT*FROM extension_pit_table WHERE name_ID = '${values[i].female.extension.pit_id}'`,(err,dat)=>{
										if(err){
											console.log(err);
	//										res.status(404).send("i don't no");
										}else{
											values[i].female.extension.pit_id = dat;
											flag2++;
											if(flag2 == values.length){
				                  				callback(null,values);
											}
										}
									});
								}
							});
				 		}
						
					})(i)
				}
				
			},
			function(values,callback){
//				extension_pit_table	数据库
				var flag3=0;
				for(var i=0;i<values.length;i++){
					(function(i){
						if(values[i].nameID==0){
				 			flag3++;
			 				if(flag3 == values.length){
								
                  				callback(null,values)
							}
				 		}else{
			 				db.query(`SELECT*FROM extension_pit_table WHERE name_ID ='${values[i].male.extension.urinal_id}'`,(err,data)=>{
								if(err){
									console.log(err);
	//								res.status(404).send("i don't no");
								}else{
									values[i].male.extension.urinal_id = data;
									db.query(`SELECT*FROM extension_pit_table WHERE name_ID = '${values[i].female.extension.urinal_id}'`,(err,dat)=>{
										if(err){
											console.log(err);
	//										res.status(404).send("i don't no");
										}else{
											values[i].female.extension.urinal_id = dat;
											flag3++;
											if(flag3 == values.length){
				                  				callback(null,values);
											}
										}
									});
								}
							});
				 		}
					
					})(i)
				}
				
			}],function(err,result){
				
				res.json({'data':result,'result':1,'pageAll':pageAll});
			});
		});
		router.post('/index3Details',(req,res)=>{
			 var idx = req.body.ID;
			async.waterfall([function(callback){
				db.query(`SELECT*FROM toiletDetails_table WHERE ID='${idx}'`,(err,data)=>{
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
						res.status(404).send("i don't no");
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
		router.post('/index3Repair',(req,res)=>{
			 var idx = req.body.ID;
			db.query(`SELECT*FROM toiletDetails_table WHERE ID='${idx}'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
					}else{
						idx = data[0].Tencent_ID;
						var sn = data[0].nameID;
						if(idx == ""){
							idx = 2;
						}
						db.query(`SELECT*FROM repairs_table WHERE nameID='${idx}' or SN='${sn}'`,(err,dat)=>{
							if(err){
								console.log(err);
//								res.status(404).send("i don't no");
							}else{
								res.json({'data':dat,'result':1});
							}
						});
				}
			});
		});
		router.post('/index3Like',(req,res)=>{
			 var idx = req.body.ID;
			db.query(`SELECT*FROM toiletDetails_table WHERE ID='${idx}'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
						idx = data[0].Tencent_ID;
						var sn = data[0].nameID;
						if(idx == ""){
							idx = 2;
						}
						db.query(`SELECT*FROM evaluate_table WHERE nameID='${idx}' or SN='${sn}'`,(err,dat)=>{
							if(err){
								console.log(err);
//								res.status(404).send("i don't no");
							}else{
								res.json({'data':dat,'result':1});
							}
						});
				}
			});
		});
//		index4界面的路由
		router.get('/index4',(req,res)=>{
			db.query(`SELECT*FROM parameter_table`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					res.json({'data':data,'result':1});
				}
			});
		});
		router.post('/index4',(req,res)=>{
			if(req.body.type==1){
				db.query(`UPDATE parameter_table SET  name='${req.body.name}'`,(err)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						res.json({'result':1});
					}
				});
			}else if(req.body.type==2){
				db.query(`UPDATE parameter_table SET repairs='${req.body.repairs}'`,(err)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					res.json({'result':1});
				}
			});
			}else if(req.body.type==3){
				db.query(`UPDATE parameter_table SET evaluate='${req.body.evaluate}'`,(err)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					res.json({'result':1});
				}
				});
			}else if(req.body.type==4){
				db.query(`UPDATE parameter_table SET shits='${req.body.shits}'`,(err)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						res.json({'result':1});
					}
				});
			}else{
				res.json({'result':0});
			}
		});
	
	//index5
	router.get('/index5',(req,res)=>{
		var page = req.query.page;
		if(page==undefined){
			page=1;
		}
		db.query(`SELECT*FROM evaluate_table`,(err,data)=>{
			if(err){
				console.log(err);
//				res.status(404).send("i don't no");
			}else{
				db.query(`SELECT*FROM parameter_table`,(err,dat)=>{
					if(err){
						console.log(err);
//						res.status(404).send("i don't no");
					}else{
						for(var i=0;i<data.length;i++){
							data[i].HealthStar = JSON.parse(data[i].HealthStar);
						}
						var pageAll=data.length;
						data.reverse();
						if(data.length/10+1>page){
							if(page==1){
								data = data.slice(0,20);
							}else{
								data = data.slice(10*page-10,10*(page+1));
							}
						}else{
							data = data.slice(0,20);
						}
						var alldata = [data,dat[0].evaluate,pageAll];
						res.json({'data':alldata,'result':1});
					}
				});
			}
		});
	});
	router.post('/index5Details',(req,res)=>{
			 var idx = req.body.ID;
			db.query(`SELECT*FROM evaluate_table WHERE ID='${idx}'`,(err,data)=>{
				if(err){
					console.log(err);
//					res.status(404).send("i don't no");
				}else{
					data[0].HealthStar = JSON.parse(data[0].HealthStar);
					res.json({'data':data,'result':1});
				}
			});
		});

		return router;
}








