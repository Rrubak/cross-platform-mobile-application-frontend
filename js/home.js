
$(document).ready(function() {
    check();
    get_vehicle_no();
//    check_availability();
     var name = localStorage.getItem('name');
    document.getElementById('content-main').innerHTML = '<h1>Welcome '+ name +'</h1>';
    
    
	 $("#add_vehicle").click(function(e){
         document.getElementById('content-main').innerHTML = "";
         count = localStorage.getItem('count');
         if(count >= 5){
             document.getElementById('response').innerHTML = '<div class="alert alert-danger"><strong>Sorry!</strong>You Reached the limit!!</div>' ;
         }else{
         $("#wrapper").toggleClass("toggled");
         document.getElementById('content-main').innerHTML = '<form id="add_vehicle_form"><h4>1.Enter Vehicle Number</h4><br><input class="form-control" id="tb1" type="text" name="vehicle_no" placeholder="Enter Vehicle Number" required><br><h4>2.Enter Vehicle RC Date</h4><br><input class="form-control" id="tb2" type="date" name="vehicle_RC_date" placeholder="Enter Vehicle RC Date" required><br><h4>3.Enter Insurance Date</h4><br><input class="form-control" id="tb3" type="date" name="insurance_date" placeholder="Enter Vehicle Insurance Date" required><br><h4>4.Enter Loan Due Date</h4><br><input class="form-control" id="tb4" type="date" name="loan_due_date" v  placeholder="Enter Loan Due Date" required><br><h4>5.Enter Loan Due Amount</h4><br><input class="form-control" id="tb5" type="text" name="loan_due_amount" placeholder="Enter Loan Due Amount" required><br><h4>6.Enter Reminder Date</h4><br><input class="form-control" id="tb6" type="text" name="reminder_before" placeholder="Enter Reminder Date" required><br><h4>7.Enter Due Time Interval</h4><br><input class="form-control" id="tb7" type="text" name="due_time_interval" placeholder="Enter Due Time Interval" required><br><h4>8. Enter Total Due For This Truck</h4><br><input class="form-control" id="tb8" type="text" name="total_due" placeholder="Enter Total Due For this Truck" required><br><input class="btn btn-primary form-control" type="submit" value="Add Vehicle" id="submit_form"></form>';
         
           $("form").submit(function(e){
            e.preventDefault();
            var number = localStorage.getItem('number');
            vehicle_no = $("#tb1").val();
            rc_date = $("#tb2").val();
            insurance_date = $("#tb3").val();
            due_date = $("#tb4").val();
            due_amount = $("#tb5").val();
            reminder_before = $("#tb6").val();
            due_interval = $("#tb7").val();
            total_dues = $("#tb8").val();
           document.getElementById('content-main').innerHTML = "";
                    $.ajax({
                        type : "POST",
                        url : "http://103.207.4.235:8081/mytruck/controller/add_vehicle_controller.php",
                        data : {vehicle_no : vehicle_no,rc_date : rc_date,insurance_date : insurance_date,due_date : due_date,due_amount : due_amount,reminder_before : reminder_before,due_interval : due_interval,total_dues : total_dues,phonenumber : number, count :count},
                        success: function(data){
                            console.log(data);
                            document.getElementById('content-main').innerHTML = "";
                            if(data == "success"){
//                                console.log("test");
                                document.getElementById('response').innerHTML = '<div class="alert alert-success"><strong>Sucess!</strong>Vehicle Registered</div>';
                            }else{
                                document.getElementById('response').innerHTML = '<div class="alert alert-danger"><strong>Sorry!</strong>Error!!</div>' ;
                            }
                            setTimeout(function (){ 
                            document.getElementById('response').innerHTML = " <div></div>";}, 2000);
                        }
                 });
//               document.getElementById('response').innerHTML = '<div class="alert alert-success"><strong>Sucess!</strong>Vehicle Registration Queued</div>';
                window.location.replace("refresh.html");
         });
         }
	 });
    
    
    $('#sidebar_content > li > a').click (function(e){
        e.preventDefault();
        var vehicle_no = this.id;
        data = localStorage.getItem(vehicle_no);
        var final_data = data.split(',');
        title = ["Vehicle Number" , "Vehicle RC Date" , "Insurance Date" ,"Loan Due Date" , "Loan Due Amount" , "Reminder Date","Due Time Interval", "Total Due For This Truck"];
        vehicle_data = '<h1>Vehicle Details</h1><table class="table">';
        for (var i = 0; i < final_data.length; i++) {
            vehicle_data = vehicle_data + '<tr><td>'+ title[i]+'</td><td>'+final_data[i] +'</td></tr>';
        }
        vehicle_data = vehicle_data +'</table>';
        document.getElementById('content-main').innerHTML = vehicle_data;
    });
    
    
    $('#logout').click (function(e){
        localStorage.clear();
        window.location.replace("index.html");
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
        console.log("test");
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
            console.log("test1");
            get_vehicle_no();
        });
    }

    
    function check_availability(){
        if (!navigator.onLine) {
            window.location.replace("offline.html");
        }
    }
    
    
    function get_vehicle_no(){
        console.log("test3");
        test1 = localStorage.getItem('vehicle_no');
        var test = test1.split(',');
        var data = "";
        for (var i = 0; i < test.length; i++) {
            data = data + "<li><a id="+test[i]+">"+test[i]+"</a></li><hr>";
        }
        data = data +"<br><br><br><br><br><br><br><br><br><br>";
        document.getElementById('sidebar_content').innerHTML =data ;

    }
    
    
    setInterval( function (){ 
        document.getElementById('response').innerHTML = "";}, 7000 );
});
