$(document).ready(function(){
  var $title   = $('#title');
  var $message = $('#message');

  $title.on('input',function(){
    $('#hiddenTitle').val($title.text());
  });
  $message.on('input', function(){
    $('#hiddenMessage').val($message.text());
  });
});
