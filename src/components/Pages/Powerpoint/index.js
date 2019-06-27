import $ from "jquery";

//slides control
var n = 0;
var uh = 0;
var totalSlides = 10;
   
// $("#nextSlide").click(function() {
//    nextSlider();
// });

// $("#prevSlide").click(function() {
//    prevSlider();
// });
   
function nextSlider(){
   if (n + 1 <= totalSlides) {
      $("#slide-" + n).removeClass("slide-init");
      $("#slide-" + n).addClass("slide-out");
      n++;
   }
}
function prevSlider(){
   if (n - 1 >= 0) {
         n--;
      $("#slide-" + n).removeClass("slide-out");
      $("#slide-" + n).addClass("slide-init");
   }
}

$(document).keydown(function(e) {
      switch(e.which) {
         case 37: // left
               prevSlider()
         break;
         case 39: // right
               nextSlider();
            break;
            case 32:// space
               nextSlider()
         break;
         default: console.log(n);
            break; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
});
