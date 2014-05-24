var canvas = (function() {
  var self = {};
  
  self.init = function(id) {
    self.canvas = document.getElementById(id);
    self.context = self.canvas.getContext('2d');
  };

  self.top_image = function(src) {
      var image = new Image();
      
      image.onload = function() {
        var canvas2 = document.createElement('canvas');
        canvas2.width = image.width/2;
        canvas2.height = image.height/2;
        var context2 = canvas2.getContext('2d')
        
        context2.drawImage(image, 0, 0, image.width/2, image.height/2);
        
        for (var i=4; i <= 6 && image.width/i > moopik.width; i+=2) {
          context2.drawImage(canvas2, 0, 0, image.width/i, image.height/i, 0, 0, image.width/i, image.height/i);
        }
        
        var sourceWidth = moopik.width;
        var sourceHeight = Math.round(image.height*moopik.width/image.width);
        var destWidth = sourceWidth;
        var destHeight = sourceHeight;
        var sourceX = 0;//image.width/2 - destWidth/2;
        var sourceY = 0;//image.height/2 - destHeight/2;
        var destX = 0;
        var destY = 0;
        
        self.context.drawImage(canvas2, sourceX, sourceY, sourceWidth, sourceHeight);
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
    
    $('button.share').show();
    canvas.filename = msg;
  }
  
  function saveOnError(err) {
    log('saveOnError()');
    log(err);
  }
  
  return self;
})();
