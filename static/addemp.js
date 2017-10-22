$(document).ready(function(){

  $('#saveemp').click(function(){
      if ( $('#empnaame').val().match('^[a-zA-Z]{3,16}$') ) {
        $('.error2').css("display","none");
        name=true;
      } else {
              $('.error2').css("display","block");
              name=false;
      }
        console.log(name);
     if ($('#empidd').val().match(/\(?([0-9]{3})\)?/)|| null || undefined || 0) {
            $('.error1').css("display","none");
            id=true;
      }
      else {
        $('.error1').css("display","block");
        id=false;
      }
          console.log(id);
      if ($('#emppassword').val()== 0 || null || undefined){
        $('.error3').css("display","block");
        passwod=false;
      }
      else{
        $('.error3').css("display","none");
        passwod=true;
      }
      console.log(passwod);
      if ($('#empphnum').val().match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)|| null || undefined || 0 ){
        $('.error4').css("display","none");
        phone = true;
      }
      else{
        $('.error4').css("display","block");
        phone= false;
      }
      console.log(phone);
      if ($('#empbasic').val().match(/\(?([0-9]{2})\)?/)|| null || undefined || 0) {
        $('.error5').css("display","none");
        basic= true;
      }
      else{
        $('.error5').css("display","block");
        basic= false;
      }
console.log(basic);
if (name && id && passwod && phone && basic == true) {
    var FormData = {
      empId: $('#empidd').val(),
      empName: $('#empnaame').val(),
      empPassword: $('#emppassword').val(),
      phone: $('#empphnum').val(),
      basicPay: $('#empbasic').val()
    };
    console.log(FormData);

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
  }
  else {
    console.log("FormData");
  }
  })
})
