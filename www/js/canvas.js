var canvas = (function() {
  var self = {};
  
  self.init = function(id) {
    self.canvas = document.getElementById(id);
    self.context = self.canvas.getContext('2d');
  };

  self.top_image = function(src) {
      var image = new Image();
      
      image.onload = function() {
        var sourceWidth = moopik.width;
        var sourceHeight = Math.round(image.height*moopik.width/image.width);
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var sourceX = 0;//image.width/2 - destWidth/2;
        var sourceY = 0;//image.height/2 - destHeight/2;
        var destX = 0;
        var destY = 0;
        
        self.context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight);
      }
      
      image.src = src
  }
  
  self.bottom_image = function(src) {
    var image = new Image();
    
    image.onload = function() {
      var sourceX = 0;
      var sourceY = 0;
      var sourceWidth = moopik.width;
      var sourceHeight = Math.round(moopik.width/2);
      var destWidth = sourceWidth;
      var destHeight = sourceHeight;
      var destX = 0;
      var destY = Math.round(moopik.width/2);
      
      self.context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    };
    
    image.src = src;
  };
  
  self.save = function() {
    console.log('canvas.save()');
    
    window.canvas2ImagePlugin.saveImageDataToLibrary(saveOnSuccess, saveOnError, self.canvas);
  };
  
  function saveOnSuccess(msg) {
    log('saveOnSuccess()');
    log(msg);
  }
  
  function saveOnError(err) {
    log('saveOnError()');
    log(err);
  }
  
  return self;
})();
