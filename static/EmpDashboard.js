$(document).ready(function(){
  var width = $(".infobox").width();
  $('.infobox').height(width);
  $('.cardbar').height(width * 18 / 100);
  $('.cardbody').height(width * 82 / 100);
  
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5555/getDetails',
    encode: true
  }).done(function(res){
    // console.log(res.result[0].id);
    // $('.table-body').append('<tr class="tablerow' + 0 + ' tablerow"></tr>')
    // $('.tablerow' + 0).append('<td>' + res.result[0].id + '</td>')
    // $('.tablerow' + 0).append('<td>' + res.result[0].name + '</td>')
    // $('.tablerow' + 0).append('<td>' + res.result[0].att + '</td>')
    // $('.tablerow' + 0).append('<td>' + res.result[0].basicpay + '</td>')
    // $('.tablerow' + 0).append('<td>' + res.result[0].adv + '</td>')
    // $('.tablerow' + 0).append('<td>' + res.result[0].totalsal + '</td>')
    $('.cardbar-text-id').append(res.result[0].name.toUpperCase() + "\'S ID" )
    $('.cardbody-name').append('<h1 class="cardbody-text">' + res.result[0].id + '</h1>')
    $('.cardbody-att').append('<h1 class="cardbody-text">' + res.result[0].att + '</h1>')
    $('.cardbody-adv').append('<h1 class="cardbody-text">' + res.result[0].adv + "₹" + '</h1>')
    $('.cardbody-basicpay').append('<h1 class="cardbody-text">' + res.result[0].basicpay + "₹" + '</h1>')
    $('.cardbody-total').append('<h1 class="cardbody-text">' + res.result[0].totalsal + "₹" + '</h1>')
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

$(window).resize(function(){
  var width = $(".infobox").width();
  $('.infobox').height(width);
  $('.cardbar').height(width * 18 / 100);
  $('.cardbody').height(width * 82 / 100);
})