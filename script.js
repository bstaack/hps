/*global $*/
$(document).ready(function(){
  
  var hairHtml = "";
  var hairGallery = [["assets/images/bstaack.jpg", "some of my best work"], ["assets/images/bstaack.jpg", "heyoh"], ["assets/images/bstaack.jpg", "iasipd"]];
  
// backgound images scroll different speed
  $('.parallax').parallax();

//contact modal   
  $('.modal').modal();

//auto scroll depending on what section is clicked
  $('.scrollspy').scrollSpy();

//when on mobile slide out menu  
  $(".button-collapse").sideNav();

//populate gallery with photos from the hairGallery array  
  function hairPhotos(){
    for (let i = 0; i < hairGallery.length; i++) {
      hairHtml += "<img class='materialboxed hair-photos' data-caption='" + hairGallery[i][1] + "' src=" + hairGallery[i][0] + ">";
    }
    $("#hair-photos-div").html(hairHtml);
  };
  
hairPhotos();  
  
//images take up whole screen on click
  $('.materialboxed').materialbox();  
  
  
  
  
  
  
  
});