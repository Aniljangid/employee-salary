$('#saveemp').click(function(){
  var FormData = {
    empId: $('#empid').val(),
    empName: $('#empname').val(),
    phone: $('#empphnum').val(),
    basicPay: $('#empbasic').val()
  };
  
  $.ajax({
    type: 'POST',
    url: 'http://192.168.43.31:5555/insert',
    data: FormData,
    datatype: 'json',
    encode: true
  }).done(function(res){
    console.log(res);
    console.log("insert into into database");
  })
})