var moopik = (function() {
  var self = {};
  
  self.init = function() {
    log('Getting position');
    navigator.geolocation.getCurrentPosition(
      geoOnSuccess, 
      geoOnError, 
      {enableHighAccuracy: true}
    );
  }
  
  function geoOnSuccess(position) {
    log(position.coord.latitude + ' ' + position.coord.longitude);
    withoutGPS();
  };
  function geoOnError() {
    log('Error while geolocating');
    withoutGPS();
  }
  
  function withoutGPS() {
    navigator.geolocation.getCurrentPosition(
      geoOnSuccess, 
      geoOnError
    );
  }
  
  return self;
})();