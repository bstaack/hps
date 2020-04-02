/*global $*/
/*global navigator*/
/*global bounds*/
/*global google*/

$(document).ready(function() {

  $('#contact-form').submit(function(e) {
    e.preventDefault();
    var $form = $(this);
    $.post($form.attr('action'), $form.serialize()).then(function() {
      $('.form-container').hide('slow');
      $('.thank-you').show('slow');
    });
  });

  var hairGallery = [ ["assets/images/hair/hair1.jpg", ""], ["assets/images/hair/hair2.jpg", ""], ["assets/images/hair/hair3.jpg", ""],
                      ["assets/images/hair/hair4.jpg", ""], ["assets/images/hair/hair5.jpg", ""], ["assets/images/hair/hair6.jpg", ""],
                      ["assets/images/hair/hair7.jpg", ""], ["assets/images/hair/hair8.jpg", ""], ["assets/images/hair/hair9.jpg", ""],
                      ["assets/images/hair/hair10.jpg", ""], ["assets/images/hair/hair11.jpg", ""], ["assets/images/hair/hair12.jpg", ""],
                      ["assets/images/hair/hair13.jpg", ""], ["assets/images/hair/hair14.jpg", ""], ["assets/images/hair/hair15.jpg", ""],
                      ["assets/images/hair/hair16.jpg", ""], ["assets/images/hair/hair17.jpg", ""], ["assets/images/hair/hair18.jpg", ""]
                      ];

  var photoGallery = [ ["assets/images/photography/photo1.png", ""], ["assets/images/photography/photo2.png", ""], ["assets/images/photography/photo3.png", ""],
                       ["assets/images/photography/photo4.png", ""], ["assets/images/photography/photo5.png", ""], ["assets/images/photography/photo6.png", ""],
                       ["assets/images/photography/photo7.png", ""], ["assets/images/photography/photo8.png", ""], ["assets/images/photography/photo9.png", ""],
                       ["assets/images/photography/photo10.png", ""], ["assets/images/photography/photo12.png", ""], ["assets/images/photography/photo11.png", ""]
                      ];

// backgound images scroll different speed
  $('.parallax').parallax();
//auto scroll depending on what section is clicked
  $('.scrollspy').scrollSpy();
//contact modal
  $('.modal').modal();
//when on mobile slide out menu
  $(".button-collapse").sideNav();
// blog posts
  $('.collapsible').collapsible();

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
      html += "<li><img src=" + array[i][0] + "></li>";
    }
    $(id).append(html);
  }

  photoSlider(hairGallery, "#hair-slides");
  photoSlider(photoGallery, "#photo-slides");

  photosGallery(hairGallery, "#hair-photos-div");
  photosGallery(photoGallery, "#photography-photos-div");

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
		       destination: '36.316466, -82.352621',
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
