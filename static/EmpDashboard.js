$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5555/getDetail',
    encode: true
  }).done(function(){
    
  })
})