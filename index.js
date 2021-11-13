let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();

let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let h2 = document.querySelector("h2");
h2.innerHTML = `${day}, ${date} ${month} ${year} ${hour}:${minute}`;

function showTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
celsiusTemperature = response.data.main.temp;

temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#city").innerHTML = response.data.name; 
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed);
  document.querySelector("#icon").setAttribute("src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "5b8ccf110fd2c3394c7e941bdfc7d356";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchLocation(event) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5b8ccf110fd2c3394c7e941bdfc7d356";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrentheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrentheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", retrievePosition);

document.querySelector("#fahrenheit").addEventListener("click", showFahrenheitTemperature);
document.querySelector("#celsius").addEventListener("click", showCelsiusTemperature);
