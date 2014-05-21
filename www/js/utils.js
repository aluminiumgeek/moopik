var cnt = 0;

function log(msg) {
  //console.log(msg);
  //navigator.notification.alert(msg);
  var log = $('#log').html();
  $('#log').html(log + '<br/>' + cnt + ': ' + msg);
  
  cnt++;
}
