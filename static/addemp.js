$(document).ready(function(){
  $('#saveemp').click(function(){
    var FormData = {
      empId: $('#empid').val(),
      empName: $('#empname').val(),
      phone: $('#empphnum').val(),
      basicPay: $('#empbasic').val()
    };
    
    $.ajax({
      type: 'POST',
<<<<<<< HEAD
      url: 'http://192.168.43.31:5555/insert',
=======
      url: 'http://localhost:5555/insert',
>>>>>>> master
      data: FormData,
      datatype: 'json',
      encode: true
    }).done(function(res){
      console.log(res);
      console.log("insert into database");
    })
  })
    
    $('.logoutbtn').click(function(){
      $.ajax({
          type: 'GET',
<<<<<<< HEAD
          url: 'http://192.168.43.31:5555/logout',
=======
          url: 'http://localhost:5555/logout',
>>>>>>> master
          encode: true
        }).done(function(res){
          window.location = res.redirect;
        })
      })
    })