jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});



function initialize() {
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
        ['Fort Station, Colombo',6.9336686,79.8478583],
        ['Gangaramaya Temple',6.9165012,79.8567201],
        ['Kochchikade Church',6.9453022,79.8537657],
        ['Horton Plains Park Office',6.8018811,80.8043183],
        ['Fox Hill Road, Diyatalawa',6.8209162,80.9522438],
        ['Ella Rock',6.855674,81.0505434],
        ['Narampanawa Bathing Place',7.1518396,80.3496181],
        ['Che Adventure Park',6.9510963,80.0974873],
        ['W Lounge',6.9229403,79.8194924],
        ['Jafna',9.6700404,79.9934068],
        ['Colombo',6.9220039,79.7861639],
        ['Nuwara Eliya',6.9514501,80.7459271],
		['Charith',7.2534959,80.3369664],
		['Beenuka',6.8429518,80.0135967],
		['Hashan',6.7123346,79.9053632],
		['Gayathra',6.8656617,79.8881501]
    ];
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' + '<h3>Caravan Fresh</h3>' 		+ '</div>'],
		['<div class="info_content">' + '<h3>Bread Talk</h3>' 			+'</div>'],
		['<div class="info_content">' + '<h3>Lotus Tower</h3>' 			+'</div>'],
		['<div class="info_content">' + '<h3>Viharamahadevi Park</h3>' 	+'</div>'],
		['<div class="info_content">' + '<h3>Odel</h3>' 				+'</div>'],
		['<div class="info_content">' + '<h3>Cotton Collection</h3>' 	+'</div>'],
		['<div class="info_content">' + '<h3>Gangaramaya Temple</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Kochchikade Church</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Horton Plains Park Office</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Fox Hill Road, Diyatalawa</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Ella Rock</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Narampanawa Bathing Place</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Che Adventure Park</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>W Lounge</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Jafna</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Colombo</h3>' 		+'</div>'],
		['<div class="info_content">' + '<h3>Nuwara Eliya</h3>' 		+'</div>'],
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


