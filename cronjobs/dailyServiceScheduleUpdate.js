var mysql = require('mysql'),
	moment = require('moment'),
	cronjob = require('cron').CronJob,
	scheduleNextServiceDate = require('../scripts/scheduleServices'),
	connection = require('../databaseConnection');



var dateToday = moment().format('l');
var getAllCustomersLastServiceDate = "SELECT customer_id, set_last_attempted_service_date FROM customer"; //query to get all customer id's from customer table



/*      Cronjob that runs every 5 hours to ensure
        customer service dates are updated.
---------------------------------------------------------  */
module.exports.dailyServiceScheduleUpdate = new cronjob({

    cronTime: '00 00 */5 * * * ', //call every five hours
    onTick: function(){
      connection.query(getAllCustomersLastServiceDate, function(err, rows){ //query to return last attempted service date
        if(err) {
          console.log(err + ' There was an error during update the customer service dates.');
        } else {
        	console.log(rows);

        	/* find the technician with the least number of customers
          ---------------------------------------------------------  */
          	rows.forEach(function(row){
            	if(moment(row.set_last_attempted_service_date).isSame(dateToday)){
            		scheduleNextServiceDate.scheduleNextServiceDate(row); //call function to set new scheduled service or just update attempted date, depending on where the date falls.
            	}
          	}); 
        }
      });

    },
    start: true,
    timeZone: "America/Los_Angeles"
});




/*
at some point I would check not only who has the least number of customers but also the 
number of customers on the day two weeks from the date (+-1 day) you are attempting to add the 
new customer as to not overload technician with many customers on one day and only
1 on each of the other days of the week.
*/