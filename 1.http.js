var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
	// 把文件渲染进来
	res.sendFile(__dirname+"/2.angularAjax.html");
})
app.post("/post",function(req,res){
	console.log(req.body);
	res.send(JSON.stringify(req.body));
})
app.all("/*",function(req,res){
	// 其他引入文件等
	console.log(req.url)
	res.sendFile(__dirname+req.url);
})
app.listen(8888);