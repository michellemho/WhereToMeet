mapboxgl.accessToken = config["MAPBOX"];

var myMap = new mapboxgl.Map({
  container: 'mapid',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-73.949,40.6946],
  zoom: 10
});

const boroughInput = document.getElementById("boro");
const addressInput = document.getElementById("addressInput");


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
      addRow(fullName);
      return [fullName, response]
    });
}

const addressList = document.getElementById("addresses");

function addRow(name) {
  addressList.style.border = "1px solid gray";

  let newRow = document.createElement("div");
  newRow.setAttribute("class", "listElement");

  let address = document.createElement("p");
  address.setAttribute("class", "addressText");
  address.textContent = name;

  let xBox = document.createElement("button");
  xBox.setAttribute("class", "listX");
  xBox.textContent = "X";
  xBox.addEventListener("click", function(e) {removeRow(e)});

  newRow.appendChild(address);
  newRow.appendChild(xBox);
  addressList.appendChild(newRow);
  }
  
function removeRow(e) {
}


