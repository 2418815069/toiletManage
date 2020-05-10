var express = require('express');
var consolidate = require('consolidate');
const bodyParser = require('body-parser');
const session = require("express-session");
const multer=require('multer');//上传文件
const multerObj=multer({dest:'./static/static/img'});
const https = require('https');
const http = require('http');
const fs = require("fs");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//2.cookie、session
app.set('trust proxy', 1);
app.use(session({
	resave : false,
	secret: 'qasystem',
	saveUninitialized: true,
	cookie: { maxAge: 24*60*60*1000}	//session能够存储的时间
}));

//设置模板引擎
app.engine('html',consolidate.ejs);//用ejs引擎来渲染html
app.set('views','dist');//template存放运行后的文件
app.set('view engine','html');

//route	
app.use('/admin', require('./route/admin')());
app.use('/', require('./route/web')());

//静态化文件夹
app.use(express.static('./static'));


////监听
//let sever = http.createServer(function (req,res) {
//	res.writeHead(301,{'Location':'https://88889889.xyz'});
//	res.end();
//});
//
app.listen(80,'0.0.0.0');

// https.createServer({
// key: fs.readFileSync('./modules/1749874_88889889.xyz.key'),//证书文件的存放目录
// cert: fs.readFileSync('./modules/1749874_88889889.xyz.crt')
// },app).listen(443,'0.0.0.0');//https默认是443端口

//app.listen(80);
console.log("程序已经运行");