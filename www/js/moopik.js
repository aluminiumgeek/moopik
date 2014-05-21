var moopik = (function($) {
  var self = {};
  
  self.init = function() {
    log('ininit');
    self.db = window.openDatabase("moopik", "1.0", "Moopik", 1000000);
    self.db.transaction(populateDb, dbErr, getLocations);
  }
  
  self.locate = function() {
    log('locate()');
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
    log('populateDb()');
    tx.executeSql("CREATE TABLE IF NOT EXISTS locations(id INTEGER PRIMARY KEY ASC, location TEXT NOT NULL)");
  }
  
  function getLocations() {
    log('getLocations()');
    
    var db = window.openDatabase("moopik", "1.0", "Moopik", 1000000);
    db.transaction(queryDb, dbErr);
  };
  
  function queryDb() {
    log('queryDb()');
    var query = "SELECT location from locations ORDER BY id DESC LIMIT 5";
    tx.executeSql(query, [], renderLocations, dbErr);
  }
  
  function renderLocations(tx, items) {
    log('renderLocations()');
    log(JSON.stringify(items));
    
    return true;
  }
  
  function dbErr(err) {
    log('Db Error:');
    log(JSON.stringify(err));
    
    return false;
  }
  
  return self;
})(jQuery);