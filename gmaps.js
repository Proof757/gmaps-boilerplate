function createMap (data) {
	var allMarkers = [],
		// Finds an element with the ID of 'map_canvas'
		map = new google.maps.Map(document.getElementById('map_canvas'), {
			zoom: 4,
			// Centers in the US by default. Feel free to change it
			center: new google.maps.LatLng(36.949892, -101.821289),
			// Disables Scrollwheel control over the map
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}),
		infowindow = new google.maps.InfoWindow(),
		entryIDReverseLookup = {},
		marker;
	// Sets up and array that stories the markers positions in allMarkers by they're entry_ids
	for(var i in data) {
		entryIDReverseLookup['ID_' + data[i].entry_id] = i;
	}
	// Sets up info windows for the markers on the map
	var setInfoWindow = function(marker, m) {
		// Sets the content in the info window
		infowindow.setContent(
			'<div class="infowindow-wrap"></div>'
		);
		infowindow.open(map, marker);
	};
	// Sets up the event click listener for the Markers
	var markerListener = function(marker, m) {
		return function() {
			// open the marker
			setInfoWindow(marker, m);
		};
	};
	for ( var j in schools) {
		marker = new google.maps.Marker({
			// Sets the position of the markers to it's passed longitude and latitude 
			position: new google.maps.LatLng(data[i].lat, data[i].lng),
			map: map
			// Sets up custom markers, if you need to do so.
			// Be sure to add a comma above if you comment the code below back in 
			// icon: new google.maps.MarkerImage(
			//	'your marker',
			//	new google.maps.Size(27, 37),
			//	new google.maps.Point(0, 0)
			// )
		});
		// adds the markers to the allMarker array
		allMarkers.push(marker);
		// Adds a click event to the markers that shows the marker's infowindow on click
		google.maps.event.addListener(marker, 'click', (markerListener)(marker, i));
	}
	// Adds a click event to the map that closes all infowindows if the map is clicked
	google.maps.event.addListener(map, 'click', (function() {
		infowindow.close();
	}));
}
// When run with a JSON object passed, creates the map and shows it
function showMap(path) {
	jQuery.ajax({
		url: path,
		dataType: 'json',
		success: function(data) {
			createMap(data);
		}
	});
}
jQuery(document).ready(function($) {
	showMap('path-to-you-data');
});
