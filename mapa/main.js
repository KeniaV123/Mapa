//Ubicacion
navigator.geolocation.getCurrentPosition(success);
function success (geolocationPosition){
  let coordenadas = geolocationPosition.coords;
        document.getElementById(
          "miUbicacion"
        ).innerHTML = `<p>${coordenadas.latitude}, ${coordenadas.longitude}</p>`;
        console.log(geolocationPosition)
}
// coordenadas
document.getElementById("btnCoords").addEventListener("click", () => {
  let latitud = document.getElementById("latitud").value;
  let longitud = document.getElementById("longitud").value;

  coords = {
    lat: latitud,
    lng: longitud,
  };

  generarMap(coords);
});

// iniciador de mapa
function initMap() {
  let latitud = 19.38604116286026;
  let longitud = -104.04932352040603;

  coords = {
    lat: latitud,
    lng: longitud,
  };

  generarMap(coords);
}

// generar el mapa
function generarMap(coords) {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(coords.lat, coords.lng),
  });

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(coords.lat, coords.lng),
    map: map,
    draggable: true,
  });

  marker.addListener("dragend", function (event) {
    document.getElementById("latitud").value = this.getPosition().lat();
    document.getElementById("longitud").value = this.getPosition().lng();
  });

  // coordenadas a direccion
  let geocoder = new google.maps.Geocoder();

  let infoWindow = new google.maps.InfoWindow();

  // geocodeLatLng(geocoder, map, infoWindow);

  document.getElementById("btnUbi").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infoWindow);
  });
}

function geocodeLatLng(geocoder, map, infoWindow) {
  let input = document.getElementById("coordsLatLng").value;

  let latlngStr = input.split(",", 2);

  let coordsLatLng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };

  geocoder.geocode({ location: coordsLatLng }).then((response) => {
    console.log(response);

    if (response.results[0]) {
   

      infoWindow.setContent(response.results[0].formatted_address);
      document.getElementById(
        "result"
      ).innerHTML = `<label for="direccion1">${response.results[0].formatted_address}</label>`;
    }
  });
}

window.initMap = initMap;
