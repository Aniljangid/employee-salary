//Author : Adarsh
//Date Created : 28 July 2017
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

var conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	db : 'empsalmgt'
})

conn.connect(function(err) {
	if(!err) {
		console.log("Connection established...");
	}
	else {
		console.log(err);
		console.log("Connection failed...");
	}
	conn.query('use empsalmgt;');
});

app.use(session({
  cookie: {
    path    : '/',
    httpOnly: false
  },
  	secret: 'anil',
	resave: false,
	saveUninitialized: false
}));

app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: true })); 

function noCache(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

function checkAuth(req, res, next) {
 	if (!req.session.admin_password) {
    	res.send('Not Authorized');
  	} else {
  		next();
  	}
}

app.get('/',noCache,function(req,res){
	if(!req.session.admin_password) {
		res.sendFile(path.join(__dirname + '/login.html'));
	}
	else{
		res.redirect('/Dashboard')
	}
});

app.get('/logout', function (req, res) {
  delete req.session.regNo;
  res.send({redirect:'/',result:'logout'});
}); 

app.get('/dashboard', checkAuth, function(req,res) {
	req.session.dontGoBack = "true";
  	res.sendFile(path.join(__dirname + '/Dashboard.html'));
});


app.get('/addEmp', checkAuth, function(req,res) {
  res.sendFile(path.join(__dirname + '/Addemp.html'));
});

app.post('/addemp', function(req,res) {
	res.send({redirect:'/addEmp',result:'success'});
});

app.post('/login', function(req,res) {
	console.log(req.body.password);
	var password = req.body.password;
	if(!req.session.admin_password) {
		conn.query('SELECT * FROM admin WHERE admin_password = ?',[password], function(error,response) {
			if(!error){
				if(response[0]) {
					console.log("success");
					req.session.admin_password = password;
					res.send({redirect:'/dashboard',result:'success'});
				}
					else {
						res.send({redirect:'/',result:'invalid'});
						console.log("Incorrect password");
					}
				}
				else
					console.log(error);
				});
			}
	else {
		console.log("Invalid password");
		res.send({redirect:'/',result:'invalid'}); 
	}
});

app.post('/insert', function(req,res) {
	var empId = req.body.empId;
	var empName = req.body.empName;
	var phone = req.body.phone;
	var basicPay = req.body.basicPay;
	if(req.session.admin_password) {
		conn.query('INSERT INTO empdetails (id,name,phnum,basicpay) values (?,?,?,?)',[empId,empName,phone,basicPay], function(err,res) {
			if(!err) {
				console.log('Insertion successfull');
				res.send({result:'success'});
			}
			else {
				res.send({result:'failed'});
			}
		})
	}
})

app.listen(5555,function(){
	console.log("Server running at port 5555");
})

