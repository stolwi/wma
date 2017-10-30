
var startIt = function() {
  $("#photos").owlCarousel({
 
      autoPlay: 6000, 
 
      items : 1,
      itemsDesktop : [1199,1],
      itemsDesktopSmall : [979,1]
 
  });
}

$(document).ready(function() {
 
  startIt();
 
});

