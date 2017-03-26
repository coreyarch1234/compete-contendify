$(document).ready(function(){
    //Show and hide login and logout buttons respectively
    function showAndHide(){
        var cookie = Cookies.get("token");
        if(cookie ==  null){
            console.log("null");
            $('#signup-button').show();
            $('#login-button').show();
            $('#logout-button').hide();
        }
        else{
            $('#signup-button').hide();
            $('#login-button').hide();
            $('#logout-button').show();
            console.log("not null");
        }
    };
    showAndHide();

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

    //Login
    $('#login').submit(function(e){
        e.preventDefault();
        var user = $(this).serialize();
        $.ajax({
           url: '/login',
           data: user,
           error: function() {
              alert('Error');
           },
           dataType: 'json',
           success: function(data) {
              console.log("Received user data");
              Cookies.set('token', data.token);
              // IF YOU'D LIKE TO REDIRECT NOW, ADD THIS:
            //   b(hidden);
              window.location.href = '/';
           },
           type: 'POST'
        });
    });

    //Logout
    $('#logout-button').click(function(e){
        Cookies.remove('token');
        window.location.href = '/';
    })
});
