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
        ['Horton Plains Park Office',6.8018811,80.8043183,'il_1'],
		['Fox Hill Road, Diyatalawa',6.8209162,80.9522438,'il_2'],
		['Ella Rock',6.855674,81.0505434,'il_3'],
		['Che Adventure Park',6.9510963,80.0974873,'il_4']
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' + '<h3>Horton Plains Park Office</h3>'+'</div>'],
		['<div class="info_content">' + '<h3>Fox Hill Road, Diyatalawa</h3>'+'</div>'],
		['<div class="info_content">' + '<h3>Ella Rock</h3>'+'</div>'],
		['<div class="info_content">' + '<h3>Che Adventure Park/h3>'+'</div>']
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


