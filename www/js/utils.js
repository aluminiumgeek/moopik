var cnt = 0;

function log(msg) {
  //console.log(msg);
  //navigator.notification.alert(msg);
  var log = $('#log').html();
  $('#log').html(log + '<br/>' + cnt + ': ' + msg);
  
  cnt++;
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}
