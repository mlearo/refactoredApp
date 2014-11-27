var mysql = require('mysql'),
	moment = require('moment'),
	connection = require('../databaseConnection'),
	scheduleNextServiceDate = require('../scripts/scheduleServices');


var state = "Ca"; // represents current State (location) app is being used
var today = moment().format('L');//variable that gets current date in MM/DD/YYYY format
var possibleServiceDate = moment().add(14, 'days').calendar(); //variable for two weeks from todays date. Used to set the first service date.                  




/*  Checks if the customer email is already in the system      
---------------------------------------------------------- */
module.exports.customerExists = function customerExists(req, res){
	connection.query("SELECT * FROM customer WHERE customer_email = '" + req.body.email + "'", function(err, rows) {
        if (err) {
        	console.log(err); 
            res.render('addNewCustomer',{customerExists: "There was an error processing your requrest, please try again."});
        } 	
        (rows.length) ? res.render('addNewCustomer',{customerExists:  "Customer is already signed up. Please review customer list."}) : assignTechnician(req, res);        
	});
};



/*  Finds the technician with the least amount of customers    
----------------------------------------------------------- */
var assignTechnician = function assignTechnician(req, res){

	connection.query('SELECT technician.technician_id, count(customer.technician_id) as number_of_customers FROM technician left join customer on (technician.technician_id = customer.technician_id) group by technician.technician_id', function(err, rows){
        if(err) {
            console.log(err);
            res.render('addNewCustomer', {customerExists: "There was an error processing your requrest, please try again."});
        }
        res.locals.techWithLeastCustomers = rows.reduce(function(tech1, tech2){
            return (tech1.number_of_customers < tech2.number_of_customers) ? tech1 :  tech2;
        });
        insertNewCustomer(req, res);
	});
};



/*  insert the new customer into the database      
----------------------------------------------- */
var insertNewCustomer = function insertNewCustomer(req, res){
	var insertQuery = "INSERT INTO customer values (" + "NULL" + ",'" + req.body.firstname + "','" + req.body.lastname + "','" + req.body.address + "','" + req.body.zipcode + "','" + req.body.city + "','" + state + "','" + req.body.email + "','" + req.body.phonenumber + "','" + today + "','" + res.locals.techWithLeastCustomers.technician_id +  "','" +  possibleServiceDate + "')";
	connection.query(insertQuery,function(err, rows) {
        if(err) { 
            console.log(err);
            res.render('/addNewCustomer',{customerExists: "There was an error processing your requrest, please try again."});
        }

        connection.query("SELECT * FROM customer WHERE customer_id = '" + rows.insertId + "'", function(err, rows) { 
            if(err) { 
                console.log(err + " unable to located that customer by his/her customer_id");
                res.render('addNewCustomer',{customerExists: "There was an error processing your requrest, please try again."})
            } else {
                scheduleNextServiceDate.scheduleNextServiceDate(rows[0]);
                res.render('home', {customerSuccessfullyAdded: true});

            }
        })
    });
}








