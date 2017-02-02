
$(document).ready(function() {
    check();
    get_vehicle_no();
//    check_availability();
    
	 $("#add_vehicle").click(function(e){
         $("#wrapper").toggleClass("toggled");
         document.getElementById('content-main').innerHTML = "";
         count = localStorage.getItem('count');
         if(count >= 5){
             document.getElementById('content-main').innerHTML = '<div class="alert alert-danger"><strong>Sorry!</strong>You Reached the limit!!</div>' ;
         }else{
         document.getElementById('content-main').innerHTML = '<form id="add_vehicle_form"><h4>1.Enter Vehicle Number</h4><br><input class="form-control" id="tb1" type="text" name="vehicle_no" placeholder="Enter Vehicle Number" required><br><h4>2.Enter Vehicle RC Date</h4><br><input class="form-control" id="tb2" type="date" name="vehicle_RC_date" placeholder="Enter Vehicle RC Date" required><br><h4>3.Enter Vehicle FC Date</h4><br><input class="form-control" id="tb3" type="date" name="vehicle_FC_date" placeholder="Enter Vehicle FC Date" required><br><h4>4.Enter Vehicle Tax Date</h4><br><input class="form-control" id="tb4" type="date" name="vehicle_Tax_date" placeholder="Enter Vehicle Tax Date" required><br><h4>5.Enter Insurance Date</h4><br><input class="form-control" id="tb5" type="date" name="insurance_date" placeholder="Enter Vehicle Insurance Date" required><br><h4>6.Enter Loan Due Date</h4><br><input class="form-control" id="tb6" type="date" name="loan_due_date" v  placeholder="Enter Loan Due Date" required><br><h4>7.Enter Loan Due Amount</h4><br><input class="form-control" id="tb7" type="text" name="loan_due_amount" placeholder="Enter Loan Due Amount" required><br><h4>8.Enter Reminder Date</h4><br><input class="form-control" id="tb8" type="text" name="reminder_before" placeholder="Enter Reminder Date" required><br><h4>9.Enter Due Time Interval</h4><br><input class="form-control" id="tb9" type="text" name="due_time_interval" placeholder="Enter Due Time Interval" required><br><h4>10. Enter Total Due For This Truck</h4><br><input class="form-control" id="tb10" type="text" name="total_due" placeholder="Enter Total Due For this Truck" required><br><input class="btn btn-primary form-control" type="submit" value="Add Vehicle" id="submit_form"></form>';
         
           $("form").submit(function(e){
            e.preventDefault();
            var number = localStorage.getItem('number');
            vehicle_no = $("#tb1").val();
            rc_date = $("#tb2").val();
            fc_date = $("#tb3").val();  
            tax = $("#tb4").val();
            insurance_date = $("#tb5").val();
            due_date = $("#tb6").val();
            due_amount = $("#tb7").val();
            reminder_before = $("#tb8").val();
            due_interval = $("#tb9").val();
            total_dues = $("#tb10").val();
            document.getElementById('content-main').innerHTML = "";
                    $.ajax({
                        type : "POST",
                        url : "http://103.207.4.235:8081/mytruck/controller/add_vehicle_controller.php",
                        data : {vehicle_no : vehicle_no,rc_date : rc_date,fc_date : fc_date,tax : tax,insurance_date : insurance_date,due_date : due_date,due_amount : due_amount,reminder_before : reminder_before,due_interval : due_interval,total_dues : total_dues,phonenumber : number, count :count},
                        success: function(data){
                            console.log(data);
                            document.getElementById('content-main').innerHTML = "";
                            if(data == "success"){
//                                console.log("test");
//                                document.getElementById('response').innerHTML = '<div class="alert alert-success"><strong>Sucess!</strong>Vehicle Registered</div>';
                            }else{
//                                document.getElementById('response').innerHTML = '<div class="alert alert-danger"><strong>Sorry!</strong>Error!!</div>' ;
                            }
                            setTimeout(function (){ 
                            document.getElementById('response').innerHTML = " <div></div>";}, 2000);
                        }
                 });
                    $(document).ajaxStop(function() {
                        window.location.replace("refresh.html");
                    });
            });
         }
	 });
    
    
    $('body').on('click','#content-main > h4',function(e){
        console.log("test");
        e.preventDefault();
        var vehicle_no = this.id;
        data = localStorage.getItem(vehicle_no);
        var final_data = data.split(',');
        title = ["Vehicle Number" , "Vehicle RC Date" , "Vehicle FC Date"," Vehicle Tax Date","Insurance Date" ,"Loan Due Date" , "Loan Due Amount" , "Reminder Date","Due Time Interval", "Total Due For This Truck"];
        vehicle_data = '<h1>Vehicle Details</h1><table class="table">';
        for (var i = 0; i < final_data.length; i++) {
            vehicle_data = vehicle_data + '<tr><td>'+ title[i]+'</td><td>'+final_data[i] +'</td></tr>';
        }
        vehicle_data = vehicle_data +'</table>';
        document.getElementById('content-main').innerHTML = vehicle_data;
    });
    
    $('#sidebar_content').click (function(e){
        $("#wrapper").toggleClass("toggled");
    });
    
    $('#logout').click (function(e){
        localStorage.clear();
        window.location.replace("index.html");
    });
   $('#view_vehicles').click (function(e){
        get_vehicle_no();
    });
   $('#Settings').click (function(e){
        user_setting();
    });
    
   $('#terms').click (function(e){
        document.getElementById('content-main').innerHTML = "<h3>Terms & Conditions</h3><br><br>1.The Intellectual Property disclosure will inform users that the contents, logo and other visual media you created is your property and is protected by copyright laws.<br><br>2.A Termination clause will inform that users’ accounts on your website and mobile app or users’ access to your website and mobile (if users can’t have an account with you) can be terminated in case of abuses or at your sole discretion.<br><br>3.A Governing Law will inform users which laws govern the agreement. This should the country in which your company is headquartered or the country from which you operate your website and mobile app.<br><br>4.A Links To Other Web Sites clause will inform users that you are not responsible for any third party websites that you link to. This kind of clause will generally inform users that they are responsible for reading and agreeing (or disagreeing) with the Terms and Conditions or Privacy Policies of these third parties.<br><br>5.If your website or mobile apps allows users to create content and make that content public to other users, a Content section will inform users that they own the rights to the content they have created.The “Content” clause usually mentions that users must give you (the website or mobile app developer) a license so that you can share this content on your website/mobile app and to make it available to other users.";
    });
    
    
    // storing input from register-form
    function store_credentials(number) {
        localStorage.setItem('number', number);
    }
    
    
    function check() {
        // stored data from the register-form
        var number = localStorage.getItem('number');
    //    console.log(number);
        // check if stored data from register-form is equal to data from login form
        if (localStorage.getItem("number") === null){
             window.location.replace("index.html");
        }
    }
    
    function store_vehicles(){
        vehicle_no = localStorage.getItem("number");
        $.ajax({
            type : "POST",
            url : "http://103.207.4.235:8081/mytruck/controller/get_lorry.php",
            data : {phonenumber : vehicle_no},
            success: function(data){
                    var data_removed_colon = data.replace(/["|[]/g,'');
                    localStorage.setItem('vehicle_no',data_removed_colon);
            }
        });
        $(document).ajaxStop(function() {
            get_vehicle_no();
        });
    }

    
    function check_availability(){
        if (!navigator.onLine) {
            window.location.replace("offline.html");
        }
    }
    
    
    function get_vehicle_no(){
        document.getElementById('content-main').innerHTML = "";
        var name = localStorage.getItem('name');
        test1 = localStorage.getItem('vehicle_no');
        var test = test1.split(',');
        var data = "<h1>Welcome "+ name +"</h1> <hr style='border-width: 5px;'>";
        
        for (var i = 0; i < test.length; i++) {
            data = data + "<h4 style='text-align:center;' id="+test[i]+">"+test[i]+"</h4><hr>";
        }
        document.getElementById('content-main').innerHTML =data ;
    }
    function user_setting(){
        var number = localStorage.getItem('number');
        var name = localStorage.getItem('name');
        console.log(number);
        var detail = '<h1 style="align:center;">UserDetail</h1><table class="table"><tr><td>UserName:</td><td>'+name+'</td></tr><br><tr><td>Number:</td><td>'+number+'</td></tr></table>';
        document.getElementById('content-main').innerHTML = detail;
    }
    
    setInterval( function (){ 
        document.getElementById('response').innerHTML = "";}, 7000 );
});
