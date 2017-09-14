$(document).ready(function(){

  $('.addbtn').click(function(){
    console.log("test");
    $.ajax({
      type: 'POST',
      url: 'http://192.168.43.59:5555/addemp',
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
