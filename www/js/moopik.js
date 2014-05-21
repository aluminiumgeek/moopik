var moopik = (function() {
  var self = {};
  
  self.init() = function() {
    navigator.geolocation.getCurrentPosition(
      geoOnSuccess, 
      geoOnError, 
      {enableHighAccuracy: true}
    );
  }
  
  function geoOnSuccess(position) {
    alert(position.coord.latitude, position.coord.longitude);
  };
  function geoOnError() {
    alert('Error while geolocating');
  }
  
  return self;
})();