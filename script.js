/*global $*/
$(document).ready(function(){
  
  var isMobile = window.matchMedia("only screen and (max-width: 1200px)");
  var hairHtml = "";
  var hairGallery = [["assets/images/bstaack.jpg", "some of my best work"], ["assets/images/bstaack.jpg", "heyoh"], ["assets/images/bstaack.jpg", "iasipd"], ["assets/images/bstaack.jpg", "some of my best work"], ["assets/images/bstaack.jpg", "heyoh"], ["assets/images/bstaack.jpg", "iasipd"]];
  
// backgound images scroll different speed
  $('.parallax').parallax();

//contact modal   
  $('.modal').modal();

//auto scroll depending on what section is clicked
  $('.scrollspy').scrollSpy();

//when on mobile slide out menu  
  $(".button-collapse").sideNav();

//populate gallery with photos from the hairGallery array  
  function hairPhotosGallery(){
    for (let i = 0; i < hairGallery.length; i++) {
      hairHtml += "<img class='materialboxed hair-photos' data-caption='" + hairGallery[i][1] + "' src=" + hairGallery[i][0] + ">";
    }
    $("#hair-photos-div").html(hairHtml);
    $(".hair-photos").css({"width": "400px", "margin-right": ".4em"});
      //images take up whole screen on click
    $('.materialboxed').materialbox();  
  };

//populate slider with photos from the hairGallery array
  function hairPhotosSlider(){
    for (let i = 0; i < hairGallery.length; i++) {
      hairHtml += "<li><img src=" + hairGallery[i][0] + "><div class='caption left-align'><h5 class='light grey-text text-lighten-3'>" + hairGallery[i][1] + "</h5></div></li>";
    }
    $("#hair-slides").html(hairHtml);
    let x = $("#hair-slides").width();
    $('.slider').slider(); 
    $(".slider, #hair-slides").height(x);
  };
  

  

  
//if on mobile put a slider for images
  if (isMobile.matches) { 
    hairPhotosSlider();
    } else { 
      $(".slider").hide(); 
      hairPhotosGallery();
  }
  
  
  
  

  
});