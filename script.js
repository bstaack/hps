/*global $*/

$(document).ready(function(){

  var mapKey = config.MAP_KEY;  
  var isMobile = window.matchMedia("only screen and (max-width: 1200px)");
  var hairHtml = "";
  var hairGallery = [["assets/images/bstaack.jpg", "some of my best work"], ["assets/images/bstaack.jpg", "heyoh"], ["assets/images/bstaack.jpg", "iasipd"], 
                    ["assets/images/bstaack.jpg", "some of my best work"], ["assets/images/bstaack.jpg", "heyoh"], ["assets/images/bstaack.jpg", "iasipd"]];
  
// backgound images scroll different speed
  $('.parallax').parallax();
  
//auto scroll depending on what section is clicked
  $('.scrollspy').scrollSpy();
  
//contact modal   
  $('.modal').modal();

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
    $("#hair-slides").height(x);
    $(".slider").height(x + 50);
  };
  
//if on mobile put a slider for images
  if (isMobile.matches) { 
    hairPhotosSlider();
    } else { 
      $(".slider").hide(); 
      hairPhotosGallery();
  }
  
  
  var mapHtml = "<script>function initMap() {var myLatLng = {lat: 36.344554, lng: -82.400961}; var map = new google.maps.Map(document.getElementById('map'), { center: myLatLng, scrollwheel: true, zoom: 12}); var marker = new google.maps.Marker({map: map, position: myLatLng, title: 'XOXO Salon'});}</script><script src='https://maps.googleapis.com/maps/api/js?key=" + mapKey + "&callback=initMap' async defer></script>";
  
  $("#mapScript").html(mapHtml);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
});