$(document).ready(function(){

  $.ajax({
    type: 'GET',
    url: 'http://192.168.43.31:5555/display',
    encode: true
  }).done(function(data){
    console.log(data);
    for (var i = 0; i < num; i++) {
      $('.table-body').append('<tr class=tablerow' + i + ' tablerow></tr>')
  })

  $('.addbtn').click(function(){
    console.log("test");
    $.ajax({
      type: 'POST',
      url: 'http://192.168.43.31:5555/addemp',
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
