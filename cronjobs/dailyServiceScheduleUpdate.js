var mysql = require('mysql'),
	moment = require('moment'),
	cronjob = require('cron').CronJob,
	scheduleNextServiceDate = require('../scripts/scheduleServices'),
	connection = require('../databaseConnection');



var dateToday = moment().format('l');
var getAllCustomersLastServiceDate = "SELECT customer_id, set_last_attempted_service_date FROM customer"; //query to get all customer id's from customer table

module.exports.dailyServiceScheduleUpdate = new cronjob({

    cronTime: '00 00 */5 * * * ', //call every five hours
    onTick: function(){
      connection.query(getAllCustomersLastServiceDate, function(err, rows){ //query to return last attempted service date
        if(err) {
          console.log(err);
        } else {
        	console.log(rows);
        	
        	
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




//exports.dailySchedulingOfNextService = dailySchedulingOfNextService;