/*
Server setup
*/


var express = require('express'),
	app = require('./app');
	
	
var server = app.listen(3000, function(){
	console.log("Listening....... ");
});

/* pull stack to review
----------------------------*/
console.log('stack', app._router.stack);

module.exports = server;
