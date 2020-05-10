const express=require('express');
const mysql=require('mysql');


var db=mysql.createPool({host: 'localhost', user: 'root', password: '', database: 'smart_city_toilet'});
module.exports=function(){
		router=express.Router();
		router.get('/',(req,res)=>{
				res.render('admin/index.html',{});
		});
//		index1界面的路由
		router.get('/index1',(req,res)=>{
			db.query(`SELECT*FROM repairs_table WHERE tag='未'`,(err,data)=>{
				if(err){
					console.log(err);
					res.status(404).send("i don't no");
				}else{
					data.reverse();
					res.json({'data':data,'result':1});
				}
			});
		});
		router.post('/alltag',(req,res)=>{
			db.query(`UPDATE repairs_table SET tag='已'`,(err,data)=>{
				if(err){
					console.log(err);
					res.status(404).send("i don't no");
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
							res.status(404).send("i don't no");
						}else{
							if(flag==atag.length-1){
								res.json({'result':1});
							}
						}
					});
				})(i)
			}
		});
		router.post('/history',(req,res)=>{
			db.query(`SELECT*FROM repairs_table WHERE tag='已'`,(err,data)=>{
				if(err){
					console.log(err);
					res.status(404).send("i don't no");
				}else{
					data.reverse();
					res.json({'data':data,'result':1});
				}
			});
		});
		router.post('/sousuo',(req,res)=>{
			var idw = req.body.data;
			db.query(`SELECT*FROM repairs_table WHERE time LIKE '%${idw}%'`,(err,data)=>{
				if(err){
					console.log(err);
					res.status(404).send("i don't no");
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
					res.status(404).send("i don't no");
				}else{
					res.json({'data':data,'result':1});
				}
			});
		});
//		index3界面的路由
		router.get('/index3',(req,res)=>{
			db.query(`SELECT*FROM repairs_table`,(err,data)=>{
				if(err){
					console.log(err);
					res.status(404).send("i don't no");
				}else{
					res.json({'data':data,'result':1});
				}
			});
		});
//		index4界面的路由
		router.get('/index4',(req,res)=>{
			db.query(`SELECT*FROM parameter_table`,(err,data)=>{
				if(err){
					console.log(err);
					res.status(404).send("i don't no");
				}else{
					res.json({'data':data,'result':1});
				}
			});
		});
		router.post('/index4',(req,res)=>{
			console.log(req.body);
			db.query(`UPDATE parameter_table SET repairs='${req.body.repairs}',name='${req.body.name}',evaluate='${req.body.evaluate}'`,(err)=>{
				if(err){
					console.log(err);
					res.status(404).send("i don't no");
				}else{
					res.json({'result':1});
				}
			});
		});
		return router;
}








