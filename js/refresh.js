$(document).ready(function() {
    store_credentials();
});
function store_credentials() {
    phone_no = localStorage.getItem("number");
    $.ajax({
        type : "POST",
        url : "http://103.207.4.235:8081/mytruck/controller/get_user_details.php",
        data : {phonenumber : phone_no},
        success: function(data){
            var data_removed_colon = data.replace(/["|[]/g,'');
            var data_final = data_removed_colon.replace(/]/g,'');
            var jsonarray = data_final.split(',');
//            console.log(jsonarray);
            localStorage.setItem('id',jsonarray[0]);
            localStorage.setItem('name',jsonarray[1]);
            localStorage.setItem('count',jsonarray[2]);
            store_vehicles();
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
            window.location.replace("home.html");
        });
}