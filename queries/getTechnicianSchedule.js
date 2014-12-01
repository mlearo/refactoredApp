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
		res.locals.technicianInfo = technicians; // put technician information retrived from database in local variable
		//getCustomerInfo(req, res);		
		getSchedule(req, res);
	})
};


/*  Refactored code, these two functions are no longer needed

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

	var weeklyScheduleInformationQuery = "SELECT scheduledServices.service_date, scheduledServices.customer_id FROM scheduledServices WHERE scheduledServices.service_date >= '" + testStartDate + "' AND scheduledServices.service_date <= '" + testEndDate + ";'";

	connection.query(weeklyScheduleInformationQuery, function(err, schedule){
		if(err) {
			console.log(err + 'error finding technician information');
			res.redirect('/');
		}
		res.locals.schedule = schedule;
		console.log(schedule);
		res.render('technicianWeeklySchedule', {technicians: res.locals.technicianInformation, customers: res.locals.customers, schedule: res.locals.schedule, workweek: workWeek});

	});
}


*/
var getSchedule = function getSchedule(req, res) {

	var scheduleQuery = "select distinct customer.customer_firstname, customer.customer_lastname, customer.customer_address, customer.customer_zipcode, customer.customer_city, customer.customer_id, scheduledServices.service_date, technician.technician_id, technician.technician_name from scheduledServices join (customer, technician) on (technician.technician_id = customer.technician_id and customer.customer_id = scheduledServices.customer_id) where scheduledServices.service_date >= '10/01/2014' and scheduledServices.service_date <= '10/31/2014';"

	connection.query(scheduleQuery, function(err, schedule){
		if(err) {
			console.log(err + 'error finding technician information');
			res.redirect('/');
		}
		res.locals.schedule = schedule;
		console.log(schedule);
		res.render('tech', {schedule: res.locals.schedule, technicians: res.locals.technicianInfo, workweek: workWeek});
	})
}



