var deviceReadyDeferred = $.Deferred();
var jqmReadyDeferred = $.Deferred();

document.addEventListener("deviceReady", deviceReady, false);

function deviceReady() {
  deviceReadyDeferred.resolve();
}

$(document).one("mobileinit", function () {
  jqmReadyDeferred.resolve();
});

$.when(deviceReadyDeferred, jqmReadyDeferred).then(appLoaded);

function appLoaded() {
  log('Loaded');
  moopik.init();
  
  moopik.locate();
}
