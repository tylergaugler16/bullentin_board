$(document).ready(function(){
  console.log("EYOOOO");
  var $title   = $('#title');
  var $message = document.getElementById('message');

  $title.on('change',function(){
    console.log("title changing!");
  });
});
