function updateWeather (response) {
    let temperature = document.querySelector("#current-temperature");
    temperature.innerHTML = Math.round(response.data.temperature.current);
    let condition = document.querySelector("#condition");
    condition.innerHTML = response.data.condition.description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.temperature.humidity + "%";
    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = response.data.wind.speed + "km/h";
    console.log(response.data);

    let city = document.querySelector("#city");
    city.innerHTML = response.data.city;
}



function searchCity(city) {
    let apiKey = "7f04b746839fb9480ae129200267toa1";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
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


