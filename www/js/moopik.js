var moopik = (function() {
  var self = {};
  
  self.init = function() {
    log('Getting position');
    navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError);
  }
  
  function geoOnSuccess(position) {
    log('Success');
    log(JSON.stringify(position));
  };
  function geoOnError() {
    log('Error while geolocating');
  }
  
  return self;
})();