$(document).ready(function() {
	$('#login').hide();
    
    check();
//    check_availability();
    
	$('body').on('click', "#sign_up_click", function(){
		$('#signup').show();
		$('#login').hide();
		$('#sign_up_click').addClass("active");
		$('#log_in_click').removeClass("active");
	});
	$('body').on('click', "#log_in_click", function(){
		$('#signup').hide();
		$('#login').show();
		$('#log_in_click').addClass("active");
		$('#sign_up_click').removeClass("active");
	});
	 $("#login_form").submit(function(e){
	 	e.preventDefault();
	 	phone_no = document.getElementById('phone_no').value;
//        console.log(phone_no);  
                $.ajax({
                    type : "POST",
                    url : "http://103.207.4.235:8081/mytruck/controller/login_controller.php",
                    data : {phone_no : phone_no},
                    success: function(data){
                        if(data == "error"){
                            document.getElementById('response').innerHTML = '<div class="alert alert-danger"><strong>Sorry!</strong> Something Went Wrong</div>' ;
                        }else{
                                $("#alert-message").text("Enter Your OTP");
                                $("#alert-overlay").css("display", "block");
                                $("#newalert").css("display", "block");
                                setTimeout(function(){
                                    $("#alert-overlay").css("display", "none");
                                    $("#newalert").css("display", "none");
                                }, 15000);
                                $(".alert-dismiss").click(function() {
                                    otp = $("#otp").val();
                                    if(data == otp){
                                        $("#alert-overlay").css("display", "none");
                                        $("#newalert").css("display", "none");
                                        localStorage.setItem('number', phone_no);
                                        store_credentials(phone_no);
                                    }else{
                                        document.getElementById('response_dialog').innerHTML = '<div class="alert alert-danger"><strong>Sorry!</strong>Error!!</div>' ;
                                    }
                                });
                        }
                    }
             });
	 });
    $("#signup_form").submit(function(e){
    e.preventDefault();
    name = document.getElementById('name').value;
    phonenumber = document.getElementById('signup_phone_no').value;
    $.ajax({
        type : "POST",
        url : "http://103.207.4.235:8081/mytruck/controller/generate_otp.php",
        data : {name : name , phonenumber : phonenumber},
        success: function(data){
//            console.log(data);        
            if(data == "exists"){
                document.getElementById('response').innerHTML = '<div class="alert alert-primary"><strong>Sorry!</strong>User Already Exists</div>' ;
            }else{
                $("#alert-message").text("Enter Your OTP");
                $("#alert-overlay").css("display", "block");
                $("#newalert").css("display", "block");
                setTimeout(function(){
                    $("#alert-overlay").css("display", "none");
                        $("#newalert").css("display", "none");
                }, 15000);
                $(".alert-dismiss").click(function() {
                    otp = $("#otp").val();
                    if(data == otp){
                        $("#alert-overlay").css("display", "none");
                        $("#newalert").css("display", "none");
                        localStorage.setItem('number', phonenumber);
                        register(phonenumber,name);
                    }else{
                        document.getElementById('response_dialog').innerHTML = '<div class="alert alert-danger"><strong>Sorry!</strong>Error!!</div>' ;
                    }
                });
            }
            setTimeout(function (){ 
               document.getElementById('response').innerHTML = " <div></div>";} 
             , 2000 );
            }
        });
    });
});
function store_credentials(number) {
    $.ajax({
        type : "POST",
        url : "http://103.207.4.235:8081/mytruck/controller/get_user_details.php",
        data : {phonenumber : number},
        success: function(data){
            var data_removed_colon = data.replace(/["|[]/g,'');
            var data_final = data_removed_colon.replace(/]/g,'');
            var jsonarray = data_final.split(',');
            console.log(jsonarray);
            localStorage.setItem('id',jsonarray[0]);
            localStorage.setItem('name',jsonarray[1]);
            localStorage.setItem('count',jsonarray[2]);
            window.location.replace("refresh.html");
        }
    });
//        console.log(user_data);
}

function register(number,name) {
    $.ajax({
        type : "POST",
        url : "http://103.207.4.235:8081/mytruck/controller/signup_controller.php",
        data : {phonenumber : number,name : name},
        success: function(data){
            store_credentials(number);
        }
    });
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
                    get_vehicle_details();
            }
        });
}
function get_vehicle_details(){
        test1 = localStorage.getItem('vehicle_no');
        var test = test1.split(',');
        for (var i = 0; i < test.length; i++){
            $.ajax({
                type : "POST",
                url : "http://103.207.4.235:8081/mytruck/controller/get_vehicle_details.php",
                data : {vehicle_no : test[i]},
                success: function(data){
                            var data_removed_colon = data.replace(/["|[]/g,'');
                            var index_array = data_removed_colon.split(',');
//                            console.log(index_array[0],data_removed_colon);
                            localStorage.setItem(index_array[0],data_removed_colon);
                        }
            });
        }
        $(document).ajaxStop(function() {
            window.location.replace("refresh.html");
        });
    }

function check() {
    // stored data from the register-form
    var number = localStorage.getItem('number');
    // check if stored data from register-form is equal to data from login form
    if (localStorage.getItem("number") === null){
//        console.log("not logged in");
    }else {
        window.location.replace("refresh.html");
    }
}
function check_availability(){
    if (!navigator.onLine) {
        window.location.replace("offline.html");
    }
}

