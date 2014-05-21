var moopik = (function() {
  var self = {};
  
  self.init = function() {
    log('Getting position');
    navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError);
  }
  
  function geoOnSuccess(position) {
    log('Success');
    log(position.coord.latitude + ' ' + position.coord.longitude);
  };
  function geoOnError() {
    log('Error while geolocating');
  }
  
  return self;
})();