var curved = (function() {
  self = {};
  
  self.getPoints = function(LatStart, LngStart, LatEnd, LngEnd, Horizontal, Curviness) {
    var result = [];
    
    var Resolution = 0.1;
    var Multiplier = 1;
    
    var LastLat = LatStart;
    var LastLng = LngStart;
                
    var PartLat;
    var PartLng;
                    
    var Points = new Array();
    var PointsOffset = new Array();
                
    for (point = 0; point <= 1; point += Resolution) {
      Points.push(point);
      offset = (Curviness * Math.sin((Math.PI * point / 1)));
      PointsOffset.push(offset);
    }
                        
    var OffsetMultiplier = 0;
                
    if (Horizontal == true) {
      var OffsetLength = (LngEnd - LngStart) * 0.1;
    } 
    else {
      var OffsetLength = (LatEnd - LatStart) * 0.1;
    }
    
    for(var i = 0; i < Points.length; i++) {
      if(i == 4) {
        OffsetMultiplier = 1.5 * Multiplier;
      }
                    
      if (i >= 5) {
        OffsetMultiplier = (OffsetLength * PointsOffset[i]) * Multiplier;
      } 
      else {
        OffsetMultiplier = (OffsetLength * PointsOffset[i]) * Multiplier;
      }
      
      if(Horizontal == true) {
        PartLat = (LatStart + ((LatEnd - LatStart) * Points[i])) + OffsetMultiplier;
                        PartLng = (LngStart + ((LngEnd - LngStart) * Points[i]));
      } 
      else {
        PartLat = (LatStart + ((LatEnd - LatStart) * Points[i]));
        PartLng = (LngStart + ((LngEnd - LngStart) * Points[i])) + OffsetMultiplier;
      }

      result.push('{0},{1}'.format(PartLat, PartLng));
      
      //curvedLineCreateSegment(LastLat,LastLng,PartLat, PartLng, o.Color, o.Opacity, o.Weight, o.GapWidth, o.Map);
                    
      LastLat = PartLat;
      LastLng = PartLng;
    }
    
    return result;
  }
  
  return self;
})();
