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

      url: 'http://localhost:5555/insert',
      data: FormData,
      datatype: 'json',
      encode: true
    }).done(function(res){
      console.log(res);
      window.location = res.redirect;
      console.log("insert into database");
    })
  })
    
    $('.logoutbtn').click(function(){
      $.ajax({
          type: 'GET',
          url: 'http://localhost:5555/logout',
          encode: true
        }).done(function(res){
          window.location = res.redirect;
        })
      })
    })