var moment = require('moment'),
	mysql = require('mysql'),
	connection = require('../databaseConnection');


var monday = moment().startOf('week').add('1', 'day').format('L');//start of week variable --> always monday
var sunday = moment().endOf('week').add('1', 'day').format('L'); //end of week variable	--> always sunday

var workWeek = monday + " - " + sunday; // concatenation of start & end date


var testStartDate = '07/21/2014'; // variable for testing
var testEndDate = '08/27/2014'; // variable for testing




module.exports.createTechnicianSchedule = function createTechnicianSchedule(req, res){

	var technicianInformationQuery = "SELECT technician_id, technician_name from technician"; // query to get technician name and id

	connection.query(technicianInformationQuery, function(err, technicians){
		if(err) {
			console.log(err + 'error finding technician information');
			res.redirect('/');
		}
		res.locals.technicianInformation = technicians; // put technician information retrived from database in local variable
		getCustomerInfo(req, res);		
	})
};



var getCustomerInfo = function getCustomerInfo(req, res, next){

	var customerInformationQuery = "SELECT customer_firstname, customer_lastname, customer_address, customer_city, customer_zipcode, customer_id, technician_id FROM customer; ";

	connection.query(customerInformationQuery, function(err, customers){
		if(err) {
			console.log(err + 'error finding technician information');
			res.redirect('/');
		}
	res.locals.customers = customers; // put customer information retrived from database in local variable
	getCustomerScheduleInformation(req, res);

	})
}



var getCustomerScheduleInformation = function getCustomerScheduleInformation(req, res, next){

	var weeklyScheduleInformationQuery = "SELECT scheduledServices.service_date, scheduledServices.customer_id FROM scheduledServices WHERE scheduledServices.service_date >= '" + monday + "' AND scheduledServices.service_date <= '" + sunday + ";'";

	connection.query(weeklyScheduleInformationQuery, function(err, schedule){
		if(err) {
			console.log(err + 'error finding technician information');
			res.redirect('/');
		}
		res.locals.schedule = schedule;
		console.log(schedule);
		res.render('technicianWeeklySchedule', {technicians: res.locals.technicianInformation, customers: res.locals.customers, schedule: res.locals.schedule, workweek: workWeek});
		//res.render('test', {technicians: res.locals.technicianInformation, customers: res.locals.customers, schedule: res.locals.schedule, workweek: workWeek});

	});
}




