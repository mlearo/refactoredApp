/*
Module that handles the checking of valid service date range, updating of sel_last_attempted_service_date column in customer table,
and schedules the customers next service date if the date is within a serviceable range.
*/


var moment = require('moment'),
	mysql = require('mysql'),
	connection = require('../databaseConnection');





module.exports.scheduleNextServiceDate = function scheduleNextServiceDate(customer) {
	
	var dateTwoWeeksFromToday = moment().add(14, 'days').calendar();

	(isValidServiceDate(dateTwoWeeksFromToday)) ? updateLastAttemptedServiceDate(customer, dateTwoWeeksFromToday) : scheduleNextCustomersServiceDate(customer, dateTwoWeeksFromToday);
}



//	validates whether the date is in the range of servicable dates	//
var isValidServiceDate = function isValidServiceDate(possibleNextServiceDate){

	return (!((moment(possibleNextServiceDate).isAfter('11/01/2014', 'month')) && (moment(possibleNextServiceDate).isBefore('02/28/2014', 'month', 'day'))))
}



//	updates field in customer table set_last_attempted_service_date	//
var updateLastAttemptedServiceDate = function updateLastAttemptedServiceDate(customer, possibleNextServiceDate){

	console.log('date is not servicable');

	connection.query("UPDATE customer SET set_last_attempted_service_date = '" + possibleNextServiceDate + "'" + "WHERE customer_id='" + customer.customer_id + "'",function(err, row){
			
		if(err) console.log(err + " last attempted service date field not updated");
			
		if(!err) console.log("last attmpted service date field updated");	
	})
}



//	schedules customers next service date	//
var scheduleNextCustomersServiceDate = function scheduleNextCustomersServiceDate(customer, nextServiceDate){

	var setFirstServiceDateInsert = "INSERT INTO scheduledServices values (NULL" +",'" + customer.customer_id + "','" + nextServiceDate + "')";
			
	connection.query(setFirstServiceDateInsert, function(err, rows){

		if(err) console.log(err + " service not scheduled, there was an error");
		 	
		if(!err)console.log("service date successfully scheduled");
	})
}






