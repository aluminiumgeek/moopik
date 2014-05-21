var moopik = (function() {
  var self = {};
  
  self.init = function() {
    navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError);
  }
  
  function geoOnSuccess(position) {
    log(JSON.stringify(position));
  };
  function geoOnError() {
    log('Error while geolocating');
  }
  
  return self;
})();