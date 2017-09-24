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
  delete req.session.admin_password;
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
});

app.post('/insert', function(req,res) {
	console.log('here');
	var empId = req.body.empId;
	var empName = req.body.empName;
	var phone = req.body.phone;
	var basicPay = req.body.basicPay;
	if(req.session.admin_password) {
		conn.query('INSERT INTO empdetails (id,name,phnum,basicpay,adv,att,totalsal) values (?,?,?,?,?,?,?)',[empId,empName,phone,basicPay,0,0,0], function(err) {
			console.log(err);
			if(!err) {
				console.log('Insertion successfull');
				res.send({redirect:'/dashboard',result:'success'});
			}
			else {
				res.send({result:'failed'});
			}
		})
	}
})

app.post('/display',function(req,res) {
	var count;
	if(req.session.admin_password) {
		conn.query('SELECT count(*) AS count FROM empdetails',function(err,res) {
			if(!err) {
				count = res;	
			}
			
		}); 
		conn.query('SELECT * FROM empdetails',function(err,response) { //names response to avoid conflict
			if(!err) {
				//console.log(response);
				res.send({count:count,result:response});
			}
			else {
				res.send({result:error})
			}
		})
	}
})

app.post('/edit',function(req,res) {
	var id = req.body.result;
	if(req.session.admin_password) {
		conn.query('SELECT * FROM empdetails WHERE id=?',[id],function(err,response) { //names response to avoid conflict
			if(!err) {
				res.send({result:response});
			}
			else {
				res.send({result:error})
			}
		})
	}
})

app.post('/delete',function(req,res) {
	var id = req.body.delresult;
	console.log(id);
	if(req.session.admin_password) {
		conn.query('DELETE FROM empdetails WHERE id = ?',[id],function(err,response) {
			if(!err) {
				console.log("record deleted");
				res.send({redirect:'/dashboard',result:response})
			} else {
				console.log("error: " + err);
			}
		})
	}
})

app.post('/updateatt',function(req,res){
	var arr = [];
	for(var i=0; i<req.body.empatt.length; i++){
		var id = req.body.empatt[i];
		console.log("id: "+id);
		conn.query('SELECT * FROM empdetails WHERE id = ?',[id],function(err,response) {
			att =  response[0].att + 1;
			total = response[0].basicpay * att - response[0].adv;
			empid = response[0].id;
			conn.query('UPDATE empdetails SET att = ?, totalsal = ? WHERE id = ?',[att,total,empid],function(err,response){
				if(!err){
					console.log("inserted");
					console.log(response);
				} else {
					console.log("error: " + err);
				}
			})
		})
	}
	res.send({redirect:'/dashboard'})
})

app.listen(5555,function(){
	console.log("Server running at port 5555");
})

