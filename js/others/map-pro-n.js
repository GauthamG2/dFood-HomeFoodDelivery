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
        ['Caravan Fresh, Townhall',6.9164688,79.873928],
        ['Bread Talk, Union Place',6.9179729,79.862414],
        ['Lotus Tower, Colombo',6.9271234,79.8561067],
        ['Viharamahadevi Park, Townhall',6.915184,79.862029],
        ['Odel, Colombo',6.915184,79.862029],
        ['Cotton Collection',6.9148467,79.8570012],
        ['Fort Station, Colombo',6.9336686,79.8478583]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' + '<h3>Caravan Fresh</h3>' 		+ '<p>Bla Bla</p>' +'</div>'],
		['<div class="info_content">' + '<h3>Bread Talk</h3>' 			+ '<p>Bla Bla</p>' +'</div>'],
		['<div class="info_content">' + '<h3>Lotus Tower</h3>' 			+ '<p>Bla Bla</p>' +'</div>'],
		['<div class="info_content">' + '<h3>Viharamahadevi Park</h3>' 	+ '<p>Bla Bla</p>' +'</div>'],
		['<div class="info_content">' + '<h3>Odel</h3>' 				+ '<p>Bla Bla</p>' +'</div>'],
		['<div class="info_content">' + '<h3>Cotton Collection</h3>' 	+ '<p>Bla Bla</p>' +'</div>'],
		['<div class="info_content">' + '<h3>Fort Station</h3>' 		+ '<p>Bla Bla</p>' +'</div>']
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


