function log(msg) {
  //console.log(msg);
  //navigator.notification.alert(msg);
  var log = $('#log').html();
  $('#log').html(log + '<br/>' + msg);
}
