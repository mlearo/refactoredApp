'use strict';


var express = require('express'),
	bodyparser = require('body-parser'),
	mysql = require('mysql'),
	moment = require('moment'),
	path = require('path'),
	scheduleNextServiceDate = require('./scripts/scheduleServices'),
	addNewCustomer = require('./queries/addNewCustomer'),
	getInvoices = require('./queries/getInvoices'),
	getTechnicianSchedule = require('./queries/getTechnicianSchedule'),
	connection = require('./databaseConnection');

require('./cronjobs/dailyServiceScheduleUpdate');

var state = "Ca";
var app = express();




//	set view engine to ejs	//
app.set('view engine', 'ejs');




//	use middleware	//
app.use(bodyparser());
app.use(express.static(path.join(__dirname, 'public')));







app.get('/',function(req, res) {

	res.render('home');
})


app.get('/addNewCustomer', function(req, res) {

	res.render('addNewCustomer.ejs');
});


app.post('/signup', function(req, res) {

	addNewCustomer.customerExists(req, res);
});


app.get('/customerInvoices', function(req, res) {

	getInvoices.getCustomerInvoices(req, res);	
})


app.get('/technicianWeeklySchedule', function(req, res) {

	getTechnicianSchedule.createTechnicianSchedule(req, res);
})



module.exports = app;