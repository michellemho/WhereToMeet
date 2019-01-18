let myMap = L.map('mapid').setView([40.6946, -73.949], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoiZGFuaWVsYnVydG9uIiwiYSI6ImNqcXpnajc4MTAybnI0NG1tOXo5Nm55dWUifQ.DPEZeklc_mPhpt_2aXz4SA'
  }).addTo(myMap);

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
  return [myJson['features'][0]['geometry']['coordinates'][1],
          myJson['features'][0]['geometry']['coordinates'][0]];
}


function addMarker(long, lat) {
  let marker = L.marker([long, lat]).addTo(myMap);
  return marker;
  }

function geocodeAndDraw(address, borough){
  return geocodeAddress(address, borough).then(latLong => {addMarker(latLong[1], latLong[0])})
}