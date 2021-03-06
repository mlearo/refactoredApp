'use strict';

$(document).ready(function(){
	
    var isEmpty = /^\s*$/ ;
    var usernameRegex = /^[a-zA-Z0-9\-\_\@\.]+$/; //declare username validation regex
    var nameRegex = /^[a-zA-Z\-\s]+$/;
    var phoneNumberRegex = /^[0-9\-]/;
    var addressRegex =  /^[a-zA-Z0-9\-\#\s\.]+$/;



    (function(){ 
         $('#firstNameInput').keyup(function(){
            ((!nameRegex.test($('#firstNameInput').val())) && (!isEmpty.test($('#firstNameInput').val()))) ? $('#firstNameInput'). attr("style", "border:inset red 2px"): $('#firstNameInput').attr("style", "border:inset #66FF00 2px");
            if(isEmpty.test($('#firstNameInput').val())) $('#firstNameInput').css("border", "");
      })})();        

    (function(){ 
         $('#lastNameInput').keyup(function(){
            ((!nameRegex.test($('#lastNameInput').val())) && (!isEmpty.test($('#lastNameInput').val()))) ? $('#lastNameInput'). attr("style", "border:inset red 2px"): $('#lastNameInput').attr("style", "border:inset #66FF00 2px");
            if(isEmpty.test($('#lastNameInput').val())) $('#lastNameInput').css("border", "");
      })})(); 

    (function(){ 
        $('#cityInput').keyup(function(){
            ((!nameRegex.test($('#cityInput').val())) && (!isEmpty.test($('#cityInput').val()))) ? $('#cityInput'). attr("style", "border:inset red 2px"): $('#cityInput').attr("style", "border:inset #66FF00 2px");
            if(isEmpty.test($('#cityInput').val())) $('#cityInput').css("border", "");
    })})();   

    (function(){ 
         $('#addressInput').keyup(function(){
            ((!addressRegex.test($('#addressInput').val())) && (!isEmpty.test($('#addressInput').val()))) ? $('#addressInput'). attr("style", "border:inset red 2px"): $('#addressInput').attr("style", "border:inset #66FF00 2px");
            if(isEmpty.test($('#addressInput').val())) $('#addressInput').css("border", "");
      })})();  

    (function(){ 
         $('#zipcodeInput').keyup(function(){
            ((!phoneNumberRegex.test($('#zipcodeInput').val())) && (!isEmpty.test($('#zipcodeInput').val()))) ? $('#zipcodeInput'). attr("style", "border:inset red 2px"): $('#zipcodeInput').attr("style", "border:inset #66FF00 2px");
            if(isEmpty.test($('#zipcodeInput').val())) $('#zipcodeInput').css("border", "");
    })})();    

    (function(){ 
        $('#phoneNumberInput').keyup(function(){
            ((!phoneNumberRegex.test($('#phoneNumberInput').val())) && (!isEmpty.test($('#phoneNumberInput').val()))) ? $('#phoneNumberInput'). attr("style", "border:inset red 2px"): $('#phoneNumberInput').attr("style", "border:inset #66FF00 2px");
            if(isEmpty.test($('#phoneNumberInput').val())) $('#phoneNumberInput').css("border", "");
    })})();       

    // Could code the above in a more efficient way, refactor when time permits
   

    // retrieves selected customers rendered services information from the current billing period.
    /*$("#customerIds").change(function(){
        var date = new Date();
        var dueDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).toString().slice(0,16);

        var selectedCustomer = $("#customerIds").children("option").filter(":selected").text();

        $.get('/retrieve', {'customer': selectedCustomer}).done(function(data){
            console.log(data);
            var customerInformation = data.invoices;
            

                      

            $('#customerName').html("Customer Name: " + customerInformation[0].customer_firstname + customerInformation[0].customer_lastname);
            $('#statementPeriod').html($('#statementPeriod').html() + " " + data.statementPeriod);

            customerInformation.forEach(function(service){

            (!$('#serviceDate').html()) ? $('#serviceDate').html(service.service_date) : $('#serviceDate').html($('#serviceDate').html() + ", " + service.service_date);
            });    
            $('#amountDue').html("$" + (20.00 * customerInformation.length));
            $('#dueDate').html(dueDate);

            $('#customerAddress').append("<p>" +  customerInformation[0].customer_name + "</p>");
            $('#customerAddress').append("<p>" +  customerInformation[0].customer_address + "</p>");
            $('#customerAddress').append("<p>" +  customerInformation[0].customer_city + ", " + customerInformation[0].customer_state + ", " + customerInformation[0].customer_zipcode + "</p>");
        
        });
        
    })*/




    
});