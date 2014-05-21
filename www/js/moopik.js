var moopik = (function($) {
  var self = {};
  
  self.init = function() {
    log('ininit');
    self.db = window.openDatabase("moopik", "1.0", "Moopik", 1000000);
    self.db.transaction(populateDb, dbErr);
    
    self.db.transaction(getLocations, dbErr);
    
    navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError);
  }
  
  function geoOnSuccess(position) {
    var location = JSON.stringify(position);
    log(location);
    
    self.position = position;
    
    self.db.transaction(function(tx) {
      tx.executeSql("INSERT INTO locations(location) VALUES ("+location+")");
    });
  };
  function geoOnError() {
    log('Error while geolocating');
  }
  
  function populateDb(tx) {
    log('populateDb()')
    tx.ececuteSql("CREATE TABLE IF NOT EXISTS locations(id INTEGER PRIMARY KEY ASC, location TEXT NOT NULL)");
  }
  
  function getLocations(tx) {
    log('getLocations()')
    tx.executeSql(
      "SELECT location from locations ORDER BY id DESC LIMIT 5",
      [],
      renderLocations,
      dbErr
    );
  };
  
  function renderLocations(tx, items) {
    log('renderLocations()');
    log(JSON.stringify(items));
  }
  
  function dbErr(err) {
    log(JSON.stringify(err));
  }
  
  return self;
})(jQuery);