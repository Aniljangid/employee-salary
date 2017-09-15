$(document).ready(function(){

  $.ajax({
    type: 'POST',
<<<<<<< HEAD
    url: 'http://192.168.43.31:5555/display',
=======
    url: 'http://localhost:5555/display',
>>>>>>> master
    encode: true
  }).done(function(res){
    console.log(res.result[0].id);
    console.log(res.count[0].count);
     for (var i = 0; i < res.count[0].count; i++) {
       $('.table-body').append('<tr class="tablerow' + i + ' tablerow"></tr>')
       $('.tablerow' + i).append('<td><input type="checkbox" id="' + res.result[i].id + 'chk" class="chk' + i + '"></td>')
       $('.tablerow' + i).append('<td>' + res.result[i].id + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].name + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].att + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].basicpay + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].adv + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].totalsal + '</td>')
       $('.tablerow' + i).append('<td><button type="button" id="' + res.result[i].id + '" class="btn btn-primary">Edit</button></td>')
     }
     
     $('.chkall').click(function() {
       
       if($('.chkall').prop('checked')== true){
         for (var i = 0; i < res.count[0].count; i++) {
           $('.chk' + i).prop('checked', true);
         }
       } else if ($('.chkall').prop('checked')== false) {
         for (var i = 0; i < res.count[0].count; i++) {
           $('.chk' + i).prop('checked', false);
         }
       }
       
});
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

  $('.addbtn').click(function(){
    console.log("test");
    $.ajax({
      type: 'POST',
<<<<<<< HEAD
      url: 'http://192.168.43.31:5555/addemp',
=======
      url: 'http://localhost:5555/addemp',
>>>>>>> master
      encode: true
    }).done(function(res){
      window.location = res.redirect;
    })
  })
  
})
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

}
