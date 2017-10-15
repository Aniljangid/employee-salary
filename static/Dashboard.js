$(document).ready(function(){

  $("#empid").attr("disabled", "disabled");
  $("#total").attr("disabled", "disabled");

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5555/display',
    encode: true
  }).done(function(res){
     for (var i = 0; i < res.count[0].count; i++) {
       $('.table-body').append('<tr class="tablerow' + i + ' tablerow"></tr>')
       $('.tablerow' + i).append('<td><input type="checkbox" id="chk' + res.result[i].id + '" class="chk' + i + '"></td>')
       $('.tablerow' + i).append('<td>' + res.result[i].id + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].name + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].att + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].basicpay + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].adv + '</td>')
       $('.tablerow' + i).append('<td>' + res.result[i].totalsal + '</td>')
       $('.tablerow' + i).append('<td><button type="button" id="editbtn' + res.result[i].id + '" class="btn btn-primary editbtn">Edit</button></td>')
       $('.tablerow' + i).append('<td><button type="button" id="delbtn' + res.result[i].id + '" class="btn btn-primary delbtn">delete</button></td>')
     }

     $(".editbtn").click(function(){
         $("#myModal").modal();
         var editbtn_id = $(this).attr('id');
         var result = editbtn_id.substring(7);
         $.ajax({
           type: 'POST',
           data: { result : result },
           url: 'http://localhost:5555/edit',
           encode: true
         }).done(function(res){
           $('#empid').val(res.result[0].id);
           $('#empname').val(res.result[0].name);
           $('#phnum').val(res.result[0].phnum);
           $('#empattendance').val(res.result[0].att);
           $('#basicpay').val(res.result[0].basicpay);
           $('#advance').val(res.result[0].adv);
           $('#total').val(res.result[0].totalsal);
         })
     });

     $('.delbtn').click(function() {
       var delbtn_id = $(this).attr('id');
      var delresult = delbtn_id.substring(6);
       $("#delmodal").modal();
       $('#del').addClass(delresult);
       });

       $('#del').click(function() {
         var delpassword = $('#delpassword').val();

          console.log("HERE" + delpassword);

        var delbtn_id = $('#del').attr('class');
        var delresult = delbtn_id[delbtn_id.length -1];
        console.log(delresult);
         $.ajax({
           type: 'POST',
           url: 'http://localhost:5555/delete',
           data: { delresult : delresult,
                    delpassword: delpassword},//attach clicked button id here
           encode: true
         }).done(function(res){
           window.location = res.redirect;
         })
      });

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

  $('#addatt').click(function(){
    var empatt = [];
    for (var i = 0; i < res.count[0].count; i++){
      if($('.chk' + i).prop('checked')==true){
        var att_id = $('.chk' + i).attr('id');
        var attresult = att_id.substring(3);
        empatt.push(attresult);
      }
    }
    if(empatt.length > 0){
      console.log(empatt);
      $.ajax({
        type: 'POST',
        url: 'http://localhost:5555/updateAtt',
        data: { empAtt : empatt },
        encode: true
      }).done(function(res){
        window.location = res.redirect;
      })
    } else {
      console.log("array is empty");
    }
  });

})


$('#saveedit').click(function(){
  var FormData={
     empid : $('#empid').val(),
     empname : $('#empname').val(),
     phnum : $('#phnum').val(),
     empatt : $('#empattendance').val(),
     basicpay : $('#basicpay').val(),
     empadv : $('#advance').val(),
     emptotal : $('#total').val()
  };

  $.ajax({
    type: 'POST',
    url: 'http://localhost:5555/saveEdit',
    data: FormData,
    datatype: 'json',
    encode: true
  }).done(function(res){
    console.log("saved changes");
    window.location = res.redirect;
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

  $('.add').click(function(){
    console.log("test");
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5555/addEmp',
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
