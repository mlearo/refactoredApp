'use strict';


var express = require('express'),
	bodyparser = require('body-parser'),
	mysql = require('mysql'),
	moment = require('moment'),
	path = require('path'),
	


	addNewCustomer = require('./queries/addNewCustomer'),
	getInvoices = require('./queries/getInvoices'),
	getTechnicianSchedule = require('./queries/getTechnicianSchedule'),
	connection = require('./databaseConnection');



var app = express();



/*			Import of Cron Jobs
---------------------------------------------------------  */
require('./cronjobs/dailyServiceScheduleUpdate');



/*			set view engine to ejs	
---------------------------------------------------------  */
app.set('view engine', 'ejs');



/*			Middleware	
---------------------------------------------------------  */
app.use(bodyparser());
app.use(express.static(path.join(__dirname, 'public')));



/*			Routes		
---------------------------------------------------------  */

app.get('/',function(req, res) {

	var customerSuccess = "" || res.locals.customerSuccessfullyAdded,
		invoiceError = "" || res.locals.invoiceError;

	res.render('home', {customerSuccessfullyAdded: customerSuccess, invoiceError: invoiceError });
})


app.get('/addNewCustomer', function(req, res) {

	var err = "" || res.locals.customerExists;
	
	res.render('addNewCustomer.ejs', {customerExists: err });
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

app.get('/invoices', function(req, res){

	getInvoices.getCustomerInvoices(req, res);	
})

app.use(function(request,response){
	console.log("no path for this");
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("There seems to be an issue. Please return to the prior page and try again.");
	response.end();
})

module.exports = app;