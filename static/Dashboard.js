$(document).ready(function(){

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5555/display',
    encode: true
  }).done(function(res){
     for (var i = 0; i < res.count[0].count; i++) {
       $('.table-body').append('<tr class="tablerow' + i + ' tablerow"></tr>')
       $('.tablerow' + i).append('<td><input type="checkbox" id="' + res.result[i].id + 'chk" class="chk' + i + '"></td>')
       $('.tablerow' + i).append('<td>' + res.result[i].id + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].name + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].att + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].basicpay + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].adv + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].totalsal + '</td>')
       $('.tablerow' + i).append('<td><button type="button" id="myBtn" class="btn btn-primary">Edit</button></td>')

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

  $('.btn-danger').click(function() {
    console.log("HERE")
  //   $.ajax({
  //     type: 'POST',
  //     url: 'http://localhost:5555/delete',
  //     data: { id: password },//attach clicked button id here
  //     encode: true
  //   }).done(function(res){
  //     window.location = res.redirect;
  //   })
   });
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

  $('.add').click(function(){
    console.log("test");
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5555/addemp',
      encode: true
    }).done(function(res){
      window.location = res.redirect;
    })
  })
  $(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
});

})
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

}
