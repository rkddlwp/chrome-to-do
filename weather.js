const weather = document.querySelector(".js-weather");
const API_KEY = "11c547bbb4ed1abae1a7ffafb709743c";
const COORDS = "coords";

function getWeather(lat,lng) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`
  })
}

function saveCoors(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude
  const coordsObj = {
    latitude,      // = latitude = latitude
    longitude      // = longitude = longitude
  };
  saveCoors(coordsObj);
  getWeather(latitude,longitude);
}

function handleGeoError() {

}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }
  else {
    const parseCoords = JSON.parse(loadedCoords)
    getWeather(parseCoords.latitude, parseCoords.longitude)

  }
}

function init() {
  loadCoords();
}

init();