/*global $*/

$(document).ready(function(){

  var mapKey = config.MAP_KEY;  
  var isMobile = window.matchMedia("only screen and (max-width: 800px)");
  
  var hairGallery = [["assets/images/bstaack.JPG", "some of my best work"], ["assets/images/bstaack.JPG", "heyoh"], ["assets/images/bstaack.JPG", "iasipd"], 
                    ["assets/images/bstaack.JPG", "some of my best work"], ["assets/images/bstaack.JPG", "heyoh"], ["assets/images/bstaack.JPG", "iasipd"]];
  var photoGallery = [["assets/images/hstaack.JPG", "some of my best work"], ["assets/images/hstaack.JPG", "heyoh"], ["assets/images/hstaack.JPG", "iasipd"], 
                    ["assets/images/hstaack.JPG", "some of my best work"], ["assets/images/hstaack.JPG", "heyoh"], ["assets/images/hstaack.JPG", "iasipd"]];                  
  
// backgound images scroll different speed
  $('.parallax').parallax();
//auto scroll depending on what section is clicked
  $('.scrollspy').scrollSpy();
//contact modal   
  $('.modal').modal();
//when on mobile slide out menu  
  $(".button-collapse").sideNav();

//populate gallery with photos from the hairGallery array  
  function photosGallery(array, id){
    var html = "";
    for (let i = 0; i < array.length; i++) {
     html += "<div class='gallery'><img class='materialboxed photos-gallery' data-caption='" + array[i][1] + "' src=" + array[i][0] + "></div>";
    }
    $(id).html(html);
      //images take up whole screen on click
    $('.materialboxed').materialbox();  
  };

//populate slider with photos from the hairGallery array
  function photoSlider(array, id){
    var html = "";
    for (let i = 0; i < array.length; i++) {
      html += "<li><img src=" + array[i][0] + "><div class='caption left-align'><h5 class='light grey-text text-lighten-3'>" + array[i][1] + "</h5></div></li>";
    }
    $(id).html(html);
    $('.slider').height('600px');
    $('.slider').slider(); 
    $('.slider').slider('start');
  };
  
//if on mobile put a slider for images

  if (isMobile.matches) { 
    photoSlider(hairGallery, "#hair-slides");
    photoSlider(photoGallery, "#photo-slides");
    } else { 
      $(".slider").hide(); 
      photosGallery(hairGallery, "#hair-photos-div");
      photosGallery(photoGallery, "#photography-photos-div");
  }
  

  
  
  var mapHtml = "<script>function initMap() {var myLatLng = {lat: 36.344554, lng: -82.400961}; var map = new google.maps.Map(document.getElementById('map'), { center: myLatLng, scrollwheel: false, zoom: 12}); var marker = new google.maps.Marker({map: map, position: myLatLng, title: 'XOXO Salon'});}</script><script src='https://maps.googleapis.com/maps/api/js?key=" + mapKey + "&callback=initMap' async defer></script>";
  
  $("#mapScript").html(mapHtml);
  
  
  
  
  
  
  
  
  
  
  
  
  
});