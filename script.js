/*global $*/
$(document).ready(function(){
      
//when on mobile have a collapsed menu 
  $(".button-collapse").sideNav();
  
// backgound images scroll different speed
  $('.parallax').parallax();
  
//images take up whole screen on click
  $('.materialboxed').materialbox();

//contact modal   
  $('.modal').modal();

//auto scroll depending on what section is clicked
  $('.scrollspy').scrollSpy();
  
  
  
  
  
});