/*global $*/
/*global navigator*/
/*global bounds*/

$(document).ready(function(){

  var isMobile = window.matchMedia("only screen and (max-width: 800px)");
  
  var hairGallery = [ ["assets/images/hair/DSC_0251.JPG", ""], ["assets/images/hair/gold.jpg", ""], ["assets/images/hair/DSC_0210.JPG", ""], 
                      ["assets/images/hair/DSC_0215.JPG", ""], ["assets/images/hair/baly.jpg", ""], ["assets/images/hair/DSC_0307.JPG", ""], 
                      ["assets/images/hair/fashion.jpg", ""], ["assets/images/hair/blonde.jpg", ""], ["assets/images/hair/red.jpg", ""],
                      ];
                    
  var photoGallery = [ ["assets/images/hstaack.JPG", ""], ["assets/images/hstaack.JPG", ""], ["assets/images/hstaack.JPG", ""], 
                       ["assets/images/hstaack.JPG", ""], ["assets/images/hstaack.JPG", ""], ["assets/images/hstaack.JPG", ""], 
                       ["assets/images/hstaack.JPG", ""], ["assets/images/hstaack.JPG", ""], ["assets/images/hstaack.JPG", ""], ];
  
// backgound images scroll different speed
  $('.parallax').parallax();
//auto scroll depending on what section is clicked
  $('.scrollspy').scrollSpy();
//contact modal   
  $('.modal').modal();
//when on mobile slide out menu  
  $(".button-collapse").sideNav();

//populate gallery with photos from the array  
  function photosGallery(array, id){
    var html = "";
    for (let i = 0; i < array.length; i++) {
     html += "<div class='gallery'><img class='materialboxed photos-gallery' data-caption='" + array[i][1] + "' src=" + array[i][0] + "></div>";
    }
    $(id).append(html);
    //images take up whole screen on click
    $('.materialboxed').materialbox();  
  }

//populate slider with photos from the array
  function photoSlider(array, id){
    var html = "";
    for (let i = 0; i < array.length; i++) {
      html += "<a class='carousel-item'><img src=" + array[i][0] + "></a>";
    }
    $(id).append(html);
  }
  
//if on mobile put a slider for images
  // function galleryOrSlider() {
    // if (isMobile.matches) { 
      photoSlider(hairGallery, "#hair-slides");
      photoSlider(photoGallery, "#photo-slides");
      $('.carousel').carousel();
      $('.carousel.carousel-slider').carousel({fullWidth: true});
      // } else { 
        $(".slider").hide(); 
        photosGallery(hairGallery, "#hair-photos-div");
        photosGallery(photoGallery, "#photography-photos-div");
  //   }
  // }  
  
  // galleryOrSlider();

//when clicked changes the map to view driving directions 
  $("#nav-btn").click(function(){
    var map, infoWindow;
      if (navigator.geolocation) { //Checks if browser supports geolocation
		   navigator.geolocation.getCurrentPosition(function (position) { //This gets the
		     var latitude = position.coords.latitude;                    //users current
		     var longitude = position.coords.longitude;                 //location
		     var coords = new google.maps.LatLng(latitude, longitude); //Creates variable for map coordinates
		     var directionsService = new google.maps.DirectionsService();
		     var directionsDisplay = new google.maps.DirectionsRenderer();
		     var mapOptions = 
									     {
									       zoom: 15,  //Sets zoom level (0-21)
									       scrollwheel: false,
									       center: coords, //zoom in on users location
									       mapTypeControl: true, //allows you to select map type eg. map or satellite
									       navigationControlOptions:
									       {
									         style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
									       },
									       mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
									     };
									     
		     map = new google.maps.Map(document.getElementById("map"), mapOptions /*Creates a new map using the passed optional parameters in the mapOptions parameter.*/);
		     directionsDisplay.setMap(map);
		     directionsDisplay.setPanel(document.getElementById('panel'));
		     var request = {
		       origin: coords,
		       destination: '36.346172, -82.400420',
		       travelMode: google.maps.DirectionsTravelMode.DRIVING
		     };
		
		     directionsService.route(request, function (response, status) {
		       if (status == google.maps.DirectionsStatus.OK) {
		         directionsDisplay.setDirections(response);
		       }
		     });
		   });
			}
			
			 google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
			  this.setZoom(map.getZoom()-1);
			
			  if (this.getZoom() > 15) {
			    this.setZoom(15);
				  }
				});
				map.fitBounds(bounds);

  });  
   
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
});
