$(function() {

  $('#login-form-link').click(function(e) {
      $("#login-form").delay(100).fadeIn(100);
       $("#emp-login-form").fadeOut(100);
         $('#register-form-link').removeClass('active');
           $(this).addClass('active');
             e.preventDefault();
            });
             $('#register-form-link').click(function(e) {
                 $("#emp-login-form").delay(100).fadeIn(100);
          $("#login-form").fadeOut(100);
          $('#login-form-link').removeClass('active');
           $(this).addClass('active');
             e.preventDefault();
            });

          });

$(document).ready(function(){  //loads when the page is loaded
  $("#admin-submit").click(function(e){ // executes the function when clicked on admin-submit button
    e.preventDefault();
    var password = $('#admin_password').val() // fethes the value of password from textbox

    $.ajax({          // ajax call is used to send data to backend (php)
      type: 'POST',   // type of request (POST or GET)
      url: 'http://localhost:5555/login', // where do you want to send your data
      data: { password: password },   //what type of data is it
      encode: true
    }).done(function(res) {   //done function is executed after the php code is done executing
      if(res.result=="success") {
        $('.errordiv').css('display', 'none'); //hides the error message
        window.location = res.redirect;
      }
      if(res.result == "invalid"){
        $('.errordiv').css('display', 'block'); //displays the error message
      }
    })
  })
  
  $("#emp-submit").click(function(e){
    e.preventDefault();
    var FormData{
      password : $('#emp_password').val(),
      username : $('#emp_username').val()
    };
    
    $.ajax({          
      type: 'POST',  
      url: 'http://localhost:5555/loginEmp',
      data: FormData,   
      datatype: 'json',
      encode: true
    }).done(function(res) {   
      if(res.result=="success") {
        $('.errordiv').css('display', 'none'); 
        window.location = res.redirect;
      }
      if(res.result == "invalid"){
        $('.errordiv').css('display', 'block');
      }
    })
  })

})
