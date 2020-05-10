const express=require('express');
const mysql=require('mysql');
const querystring=require("querystring");



var db=mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'smart_city_toilet'});

module.exports=function(){
		var router=express.Router();
		
		//接收数据
		router.post('/',(req,res)=>{
			var data_all = req.body;
            db.query(`INSERT INTO recordedData_table(time,male,female,third,unisex,sn) VALUES ('${data_all.time}','${JSON.stringify(data_all.male)}','${JSON.stringify(data_all.female)}','${JSON.stringify(data_all.third)}','${JSON.stringify(data_all.unisex)}',${data_all.sn})`,(err,data)=>{
                    if(err){
                       console.log(err);
                    }
            });  
             db.query(`SELECT * FROM toiletDetails_table WHERE nameID='${data_all.sn}'`,(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    if(data == ""){
                        establish(data_all.sn);
                    }else{
                        toiletDetails('male',data_all.sn,1,data_all.male);
                        toiletDetails('female',data_all.sn,2,data_all.female);
                        toiletDetails('third',data_all.sn,3,data_all.third);
                        toiletDetails('unisex',data_all.sn,4,data_all.unisex);
                    }
                }
             });
//		    db.query(`SELECT * FROM recordedData_table WHERE sn='2001810260309'`,(err,data)=>{
//		              if(err){
//		                console.log(err)
//		              }else{
//		                 
//		              }
//		     });
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
                                return 0;
                            }
                        });
                    }else{
                        db.query(`UPDATE extension_pit_table SET pit_condition='${values}' WHERE name_ID='${nameID}' and toiletDetails_ID=${pit_numbe_id}`,(err,data)=>{
                            if(err){
                                console.log(err);
                            }else{
                                return 0;
                            }
                        });
                    }
                }
            }); 
           
        }

        function establish(nameID){ //创建完整的数据链表,只通过data.sn
            var promise=new Promise(function(resolve,reject){
                db.query(`INSERT INTO toiletDetails_table(nameID,male,female,third,unisex) VALUES ('${nameID}','${nameID+"1"}','${nameID+"2"}','${nameID+"3"}','${nameID+"4"}')`,(err,data)=>{
                     if(err){
                        console.log(err);
                    }else{
                       resolve();
                    }
                });
            }).then(function(){
                var flag=1;
                for(var i=1;i<5;i++){ 
                    (function(i){
                        db.query(`INSERT INTO stat_table(name_ID,extension) VALUES ('${nameID+i}','${nameID+i+"1"}')`,(err,data)=>{
                            if(err){
                            console.log(err);
                            }else{
                                flag++;
                                if(flag == 5){
                                    return new Promise(resolve => {
                                        resolve();
                                    });
                                }
                            }
                        })     
                    })(i)
                }
            }).then(function(){
                var flag1=1; 
                 for(var i=1;i<5;i++){
                    (function(i){
                        db.query(`INSERT INTO extension_table(name_ID,pit_id,urinal_id) VALUES ('${nameID+i+"1"}','${nameID+i+"1"+"1"}','${nameID+i+"1"+"2"}')`,(err,data)=>{
                            if(err){
                            console.log(err);
                            }else{
                                flag1++;
                                if(flag1 == 5){
                                    toiletDetails('male',data_all.sn,1,data_all.male);
                                    toiletDetails('female',data_all.sn,2,data_all.female);
                                    toiletDetails('third',data_all.sn,3,data_all.third);
                                    toiletDetails('unisex',data_all.sn,4,data_all.unisex);
                                }
                            }
                        })     
                    })(i)
                }   
            });
        }
			
		});
			
		
			return router;
}