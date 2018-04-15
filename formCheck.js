var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var app = express();
mongoose.connect("mongodb://localhost:27017/user",{useMongoClient:true});
var db = mongoose.connection;


db.on("error",function(error){
	if (error) {
		return console.log(error);
	}
})	

db.on("open",function(){
	console.log("数据库连接成功");
})

var Schema = mongoose.Schema({
	username:{type:String},
	pwd:{type:String},
	sex:{type:Number,default:1},
	city:{type:String}

},{collection:"users"})
var Model = db.model("users",Schema);

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.sendFile(__dirname+"/formCheck.html");

})
app.all("/post",function(req,res){

	console.log(req.body);
	Model.create({username:req.body.username,pwd:req.body.pwd,sex:req.body.sex,city:req.body.city},function(err,data){
		if(err){
			console.log(err);
			res.send("注册失败")
		}else{
			console.log(data);
			res.send("注册成功");
		}
	})
	

})
app.all("/*",function(req,res){
	if (req.url!="favicon.ico"){
		res.sendFile(__dirname+req.url);
	}
})
app.listen(8888);