const mapboxKey = config["MAPBOX"];

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

async function getJSON(url){
  output = await fetch(url)
  .then(function(response) {
    return response.json();
  })
  return output
}

async function geocodeAddress(address, borough) {
  let query = `https://geosearch.planninglabs.nyc/v1/search?text=${address}, ${borough}`
  const response = await fetch(query);
  const myJson = await response.json();
  return [myJson['features'][0]['geometry']['coordinates'][0],
          myJson['features'][0]['geometry']['coordinates'][1]];
}


function addMarker(long, lat) {
  var marker = new mapboxgl.Marker()
  .setLngLat([long, lat])
  .addTo(myMap);
  }

function geocodeAndDraw(address, borough){
  return geocodeAddress(address, borough).then(latLong => {addMarker(latLong[0], latLong[1])})
}
<<<<<<< HEAD

// function getIsochrones()
=======
>>>>>>> 09e3b6b8576ff49e32094829221e36bb61c5087a
