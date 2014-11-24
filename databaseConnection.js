var mysql = require('mysql'); 


var connection =  mysql.createConnection({
  	host : "localhost",
  	username: "",
  	password: "",
  	database: 'mowingservice'

});


//	connect to database	//
connection.connect(function(){
	console.log("database successfully connected...");
});


module.exports = connection;