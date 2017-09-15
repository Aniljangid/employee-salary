$(document).ready(function(){

  $('.addbtn').click(function(){
    console.log("test");
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5555/addemp',
      encode: true
    }).done(function(res){
      window.location = res.redirect;
    })
  })
  
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
      console.log("insert into into database");
    })
  })
  
})
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

}
