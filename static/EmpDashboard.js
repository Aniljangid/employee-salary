$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5555/getDetails',
    encode: true
  }).done(function(res){
    console.log(res.result[0].id);
    $('.table-body').append('<tr class="tablerow' + 0 + ' tablerow"></tr>')
    $('.tablerow' + 0).append('<td>' + res.result[0].id + '</td>')
    $('.tablerow' + 0).append('<td>' + res.result[0].name + '</td>')
    $('.tablerow' + 0).append('<td>' + res.result[0].att + '</td>')
    $('.tablerow' + 0).append('<td>' + res.result[0].basicpay + '</td>')
    $('.tablerow' + 0).append('<td>' + res.result[0].adv + '</td>')
    $('.tablerow' + 0).append('<td>' + res.result[0].totalsal + '</td>')
  })
})