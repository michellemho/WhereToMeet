mapboxgl.accessToken = config["MAPBOX"];

var myMap = new mapboxgl.Map({
  container: 'mapid',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-73.949,40.6946],
  zoom: 10
});

boroughInput = document.getElementById("boro");
addressInput = document.getElementById("address");


document.getElementById("submit").addEventListener("click", function() {
  let address = addressInput.value;
  let borough = boroughInput.value;
  geocodeAndDraw(address, borough);
  });

async function geocodeAddress(address, borough) {
  let query = `https://geosearch.planninglabs.nyc/v1/search?text=${address}, ${borough}`
  const response = await fetch(query);
  return await response.json();
  //return [myJson['features'][0]['geometry']['coordinates'][0],
  //        myJson['features'][0]['geometry']['coordinates'][1]];
}


function addMarker(long, lat) {
  var marker = new mapboxgl.Marker()
  .setLngLat([long, lat])
  .addTo(myMap);
  }

function geocodeAndDraw(address, borough){
  return geocodeAddress(address, borough).then(
    function(response) {
      let long = response['features'][0]['geometry']['coordinates'][1];
      let lat = response['features'][0]['geometry']['coordinates'][0];
      let fullName = `${response['features'][0]['properties']['name']}, ${response['features'][0]['properties']['borough']}, NYC`;
      addMarker(lat, long);
      console.log(fullName);
      //latLong => {addMarker(latLong[0], latLong[1])})
    });
}
