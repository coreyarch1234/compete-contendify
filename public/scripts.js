$(document).ready(function(){
    //Sign-Up
    $('#signup').submit(function(e){
        e.preventDefault();
        var user = $(this).serialize();
        $.ajax({
           url: '/signup',
           data: user,
           error: function(error) {
              alert(error.message);
           },
           dataType: 'json',
           success: function(data) {
              console.log("Received user data");
              Cookies.set('token', data.token);
              // IF YOU'D LIKE TO REDIRECT NOW, ADD THIS:
              window.location.href = "/";
           },
           type: 'POST'
        });
    });
});
