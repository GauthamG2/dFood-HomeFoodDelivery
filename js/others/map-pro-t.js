jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
	var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
        
    // Multiple Markers
var markers = [
        ['Hashan Rangana',7.9364688,79.873928],
        ['Beenuka Pivithuru',7.9179729,79.822414],
        ['Gayathra Madubashana',7.96985,79.856967],
        ['Chaith Viduruwan',7.913184,79.826029]
       
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        		['<div class="info_content">' + '<h3>Charith</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Beenuka</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Hashan</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Gayathra</h3>' 		+'</div>']
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

	  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
		var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
			this.setZoom(14);
			google.maps.event.removeListener(boundsListener);
		});
}


