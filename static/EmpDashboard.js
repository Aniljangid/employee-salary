$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5555/getDetails',
    encode: true
  }).done(function(){
    
  })
})