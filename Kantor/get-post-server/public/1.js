var fs = require('fs');
var http = require('http');
var url = require('url');
var func = require('func');
var server = new http.createServer();

server.listen(3000);
console.log('server');

server.on('request',function(req,res){
	console.log(req.method);
	var urlka = url.parse(req.url);
	if(req.method==='GET'){
		console.log(urlka.query);
		if(!urlka.query){
			func.sendF('./index.html',fs,res);
		}else{
			console.log('--> ',urlka.query);
			func.sendF('./public/'+urlka.query,fs,res);
		}
		
	}else if(req.method==='POST'){
		var filename = urlka.query.split('=')[1];
		console.log("file name-->",filename);
		func.loadF(req,res,fs,filename);		
	}
});