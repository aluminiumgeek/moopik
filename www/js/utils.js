var cnt = 0;

function log(msg) {
  var log = $('#log').html();
  $('#log').html(log + '<br/>' + cnt + ': ' + msg);
  
  cnt++;
}

function getResolution() {
  return [window.innerWidth, window.innerHeight];
}

function scrollTo(target) {
  if (target) {
    $('body').animate({
      scrollTop: target.offset().top
    }, 750);
  }
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
