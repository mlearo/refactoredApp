var mysql = require('mysql'),
	moment = require('moment'),
	connection = require('../databaseConnection');
	scheduleNextServiceDate = require('../scripts/scheduleServices');


/*	Query to get every customers name and address information	
-------------------------------------------------------------- */

var getAllCustomers = "SELECT DISTINCT customer_firstname, customer_lastname, customer_address, customer_city, customer_zipcode, customer_state, customer_id from customer;";

//var getMonthlyCustomerBillingInfoQuery = "SELECT scheduledServices.service_date, scheduledServices.customer_id FROM scheduledServices join customer on(scheduledServices.customer_id = customer.customer_id) WHERE scheduledServices.service_date >= '" + startOfLastMonth + "'AND scheduledServices.service_date <= '" + endOfLastMonth  + ";'";
//var getCustomerInvoiceQuery = "SELECT customer.customer_firstname, customer.customer_lastname, scheduledServices.service_date, customer.customer_address, customer.customer_city, customer.customer_zipcode, customer.customer_state FROM scheduledServices join customer on(scheduledServices.customer_id = customer.customer_id) WHERE scheduledServices.service_date >= '" + startOfLastMonth + "'AND scheduledServices.service_date <= '" + endOfLastMonth  + ";'";


var startOfLastMonth = moment().subtract('1', 'month').startOf('month').format('L'); // date of the first day of the last month
var endOfLastMonth = moment().subtract('1', 'month').endOf('month').format('L'); // date of the last day of the last month
var statementPeriod = startOfLastMonth + " - " + endOfLastMonth; // combination of the two above variable dates
var billDueDate = moment().endOf('month').format('L'); // end of current month date


var amountDue = "$20.00"; // cost of each service



/*  Gets all customer invoices from the prior month. 
	Thus, whenever you visit the invoive page it 
	will be for the current invoice period.
---------------------------------------------------------  */

module.exports.getCustomerInvoices = function getCustomerInvoices(req, res){

	connection.query(getAllCustomers, function(err, customers){
		if(err){
			console.log(err + "there was an error retrieving the customer invoices");
			res.render('home',{invoiceError: true});
		}
		res.locals.customers = customers;
		
		var currentCustomersServiceBill = "SELECT scheduledServices.service_date, scheduledServices.customer_id FROM scheduledServices join customer on(scheduledServices.customer_id = customer.customer_id) WHERE scheduledServices.service_date >= '" + startOfLastMonth + "'AND scheduledServices.service_date <= '" + endOfLastMonth  + ";'";
	
		connection.query(currentCustomersServiceBill, function(err, info){		
			if(err) {
				console.log(err);
				res.render('home', {invoiceError: true});
			} else {
				res.locals.serviceInfo = info;
				res.render('customerInvoices', {customers: res.locals.customers, statementPeriod: statementPeriod, serviceInfo: res.locals.serviceInfo, billDueDate: billDueDate, amountDue: amountDue});
			}
		});		
	});
}



