function updateWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  let condition = document.querySelector("#condition");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let city = document.querySelector("#city");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;

  temperature.innerHTML = Math.round(response.data.temperature.current);
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  time.innerHTML = formatDate(date);
  city.innerHTML = response.data.city;
  
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${date.getHours()}:${date.getMinutes()}`;
}

function searchCity(city) {
  let apiKey = "7f04b746839fb9480ae129200267toa1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchCityFunction(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCityFunction);

function getForecast(city) {
  let apiKey = "7f04b746839fb9480ae129200267toa1";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast)
}


function displayForecast(response) {
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="weather-forecast-day">
      <div class="weather-forecast-date">${day}</div>
      <div class="weather-forecast-icon">🌤️</div>
      <div class="weather-forecast-temperatures">
   <div class="weather-forecast-temperature"><strong class="strong">16°C </strong> </div>
   <div class="weather-forecast-temperature">13°C</div>
    </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
