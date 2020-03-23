function initMap() {
  const position = {lat: -34.397, lng: 150.644}
  const map = new google.maps.Map(document.getElementById('map'), {
    center: position,
    zoom: 17
  });
  const marker = new google.maps.Marker({
    position:position,
    animation:google.maps.Animation.DROP,
    map:map
  });
  const infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      marker.setMap(null)
      marker.setMap(map);
      marker.setPosition(pos)
      map.setZoom(17)
      map.setCenter(pos);
      marker.setAnimation(google.maps.Animation.DROP)
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}