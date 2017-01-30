$(document).ready(function() {
  setInterval(function(){ check_availability(); }, 10000);
    function check_availability(){
        if (navigator.onLine) {
            window.location.replace("index.html");
        }
    }
});