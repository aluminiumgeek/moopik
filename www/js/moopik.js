var moopik = (function($) {
  var self = {};
  
  self.key = "AIzaSyARRMJhNZJamLwkCO5-EZbG-aL5IOkIQ1Q";
  
  self.init = function() {
    log('ininit');
    self.db = window.openDatabase("moopik", "1.0", "Moopik", 1000000);
    self.db.transaction(populateDb, dbErr, self.locate);
  }
  
  self.locate = function() {
    log('locate()');
    navigator.geolocation.getCurrentPosition(geoOnSuccess, geoOnError);
  }
  
  function geoOnSuccess(position) {
    log('geoOnSuccess()');
    
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    log('Lat: '+lat);
    log('Long: '+lat);
    var georequest = $.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true',//&key='+self.key,
      method: 'get'
    })
    
    georequest.done(function(data) {
      log('Got google geocode');
      log(data.status + ' ' + data.results.length);
      var address;
      
      if (data.status == "OK" && data.results.length > 1) {
        address = data.results[0].formatted_address;
        position.address = address;
        
        log('Address: ' + address);
      }
      
      var location = JSON.stringify(position);
      log(location);
    
      self.position = position;
    
      self.db.transaction(saveLocation, dbErr, getLocations);
    });
    
    georequest.error(function(xhr, status, err) {
      log('Error georequest: ' + status + ' ' + err);
    });
  };
  
  function geoOnError() {
    log('Error while geolocating');
  }
  
  function saveLocation(tx) {
    log('saveLocation()');
    var query = "INSERT INTO locations(location) VALUES (?)";
    tx.executeSql(query, [JSON.stringify(self.position)], dbDone, dbErr);
  }
  
  function populateDb(tx) {
    log('populateDb()');
    tx.executeSql("CREATE TABLE IF NOT EXISTS locations(id INTEGER PRIMARY KEY ASC, location TEXT NOT NULL)", [], dbDone, dbErr);
  }
  
  function getLocations() {
    log('getLocations()');
    
    var db = window.openDatabase("moopik", "1.0", "Moopik", 1000000);
    db.transaction(queryDb, dbErr);
  };
  
  function queryDb(tx) {
    log('queryDb()');
    var query = "SELECT location FROM locations";// ORDER BY id DESC LIMIT 5";
    tx.executeSql(query, [], renderLocations, dbErr);
  }
  
  function renderLocations(tx, results) {
    log('renderLocations()');

    var form = '<form>\
                  <fieldset data-role="controlgroup" class="locations">\
                    <legend>Previous locations</legend>\
                      {0}\
                  </fieldset>\
                </form>';
    var html = '';
    
    var len = results.rows.length;
    for (var i=0; i<len; i++){
      log("Data = " + results.rows.item(i).location);
      
      var location = $.parseJSON(results.rows.item(i).location);
      
      var address = location.address ? location.address : location.coords.latitude + ', ' + location.coords.longitude;
      
      
      html += '<input type="checkbox" name="location-{0}" id="location-{0}">\
      <label for="location-{0}">{1}</label>'.format(i, address);
    }
    
    form = form.format(html);
    $('.ui-content').append(form);
    
    $('#home').trigger('create');
  }

  function dbDone(something) {
    log('Db Done:');
    log(JSON.stringify(something));
  }
  
  function dbErr(err) {
    log('Db Error:');
    log(JSON.stringify(err));
    
    return false;
  }
  
  return self;
})(jQuery);