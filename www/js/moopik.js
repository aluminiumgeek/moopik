var moopik = (function($) {
  var self = {};
  
  self.key = "AIzaSyARRMJhNZJamLwkCO5-EZbG-aL5IOkIQ1Q";
  
  self.width = getResolution()[0];
  self.height = getResolution()[1];
  
  self.init = function() {
    log('ininit');
    self.db = window.openDatabase("moopik", "1.0", "Moopik", 1000000);
    self.db.transaction(populateDb, dbErr, self.locate);
  }
  
  self.map = function() {
    log('self.map()');
    
    var locations = [];
    $('.locations input[type="checkbox"]:checked').each(function() {
      log('self.map(): '+$(this).val());
      locations.push($(this).val());
    });
    
    if (locations.length > 0) {
      if (locations.length == 2) {
        lat_s = parseFloat(locations[0].split(',')[0]);
        lng_s = parseFloat(locations[0].split(',')[1]);
        lat_e = parseFloat(locations[1].split(',')[0]);
        lng_e = parseFloat(locations[1].split(',')[1]);
        h = $('select[name="horizontal"]').val() == '1' ? true : false;
        c = parseFloat($('input[name="curviness"]').val())/10;
        locations = curved.getPoints(lat_s, lng_s, lat_e, lng_e, h, c);
      }
      
      var url = 'http://maps.googleapis.com/maps/api/staticmap?size={0}&path=color:{1}|weight:5|{2}&markers=color:{3}|{4}&maptype={5}&geodesic=true&sensors=false'.format(
        '{0}x{1}'.format(self.width, Math.round(self.width/2)), // size
        $('input[name="linecolor"]').val(), // color
        locations.join('|'), // polyline                                                                                                                            
        $('input[name="markercolor"]').val(), // marker color
        locations[locations.length-1], // marker coords
        $('input[name="maptype"]:checked').val() // maptype
      )
      log(url);
      
      $('#map .image img').attr('src', url);
      $('#map .image img').load(function() {
        scrollTo($('a[name="image"]'));
      });
    }
    
  };
  //http://maps.googleapis.com/maps/api/staticmap?size=800x400&path=color:0x0000ff|weight:5|55.8180905,37.6353868|55.9180905,37.6353868|55.9180905,37.8353868&markers=color:0x7777ff|55.9180905,37.8353868&geodesic=true&sensors=false

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
      url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true',//&key='+self.key,
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
    getLocations();
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

    var form = '<form class="locations">\
                  <fieldset data-role="controlgroup">\
                    <legend>Previous locations</legend>\
                      {0}\
                  </fieldset>\
                </form>';
    var html = '';
    
    var len = results.rows.length;
    for (var i=0; i<len; i++){
      //log("Data = " + results.rows.item(i).location);
      
      var location = $.parseJSON(results.rows.item(i).location);
      
      var coords = location.coords.latitude + ', ' + location.coords.longitude
      
      var address = location.address ? location.address : coords;
      
      
      html += '<input type="checkbox" name="location-{0}" value="{2}" id="location-{0}">\
      <label for="location-{0}" class="ui-btn-c">{1}</label>'.format(i, address, coords.replace(/ /g, ''));
    }
    
    form = form.format(html);
    $('#locations').html(form);
    
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
  
  $('button.map').bind('click', function() {
    log('button.map click');
    $('#map').slideDown('normal', function() {
      scrollTo($('a[name="map"]'));
    });
  });
  
  $('button.clear').bind('click', function() {
    self.db.transaction(function(tx) {
      tx.executeSql('DROP TABLE locations');
    }, dbErr, self.init);
  });
  
  $('button.generate-map').bind('click', function() {
    self.map();
  });
  
  return self;
})(jQuery);