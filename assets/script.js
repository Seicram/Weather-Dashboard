function fetchWeather(url, containerId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherContainer = document.getElementById(containerId);
      weatherContainer.innerHTML = '';

      const forecasts = data.list.slice(1, 6); // Extract the forecasts for the next 5 days

      forecasts.forEach((forecast, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index + 1);
        const dayOfWeek = getDayOfWeek(date.getDay());
        const weatherIcon = forecast.weather[0].icon;
        const temperature = Math.round(forecast.main.temp);
        const humidity = forecast.main.humidity;

        const forecastHtml = `
          <div class="weather-forecast">
            <p class="day-of-week">${dayOfWeek}</p>
            <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
            <p class="temperature">${temperature}°F</p>
            <p class="humidity">Humidity: ${humidity}%</p>
          </div>
        `;
        weatherContainer.innerHTML += forecastHtml;
      });
    })
    .catch(error => {
      console.log('Error fetching weather:', error);
    });
}





function getDayOfWeek(dayIndex) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayIndex];
}

var fetchWeatherByZip = function(zipCode) {
  var enteredCity = 'https://api.openweathermap.org/geo/1.0/zip?zip=' + zipCode + '&appid=263899f28c1a4fdfb9c42daf32e3c285';

  fetch(enteredCity)
    .then(response => response.json())
    .then(data => {
      var lat = data.lat;
      var lon = data.lon;
      var loadWeather = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&cnt=6&appid=263899f28c1a4fdfb9c42daf32e3c285&units=imperial';

      fetch(loadWeather)
      .then(response => response.json())
      .then(data => {
        var todayForecast = data.list[0];
        var city = data.city.name;
        var weatherIcon = todayForecast.weather[0].icon;
        var temperature = Math.round(todayForecast.main.temp);
        var humidity = todayForecast.main.humidity;
  
        var todayDate = new Date(todayForecast.dt * 1000);
        var dayOfWeek = getDayOfWeek(todayDate.getDay());
  
        var todayHtml = `
          <div id="sameday" class="weather-card">
            <h2>${city}</h2>
            <p class="date">${dayOfWeek}</p>
            <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
            <p class="temperature">${temperature}°F</p>
            <p class="humidity">Humidity: ${humidity}%</p>
          </div>
        `;
        document.getElementById('sameday').innerHTML = todayHtml;
  
        // Fetch and display 5-day forecast
        fetchWeather(loadWeather, 'forecast-container');
      })
      .catch(error => {
        console.log('Error fetching weather:', error);
      });
    })
    .catch(error => {
      console.log('Error fetching city:', error);
    });
};

function saveSearch(zipCode) {
  const dropdownMenu = document.getElementById('dropdownitems');
  const existingSearch = Array.from(dropdownMenu.children).find(item => item.textContent === zipCode);

  if (!existingSearch) {
    const searchItem = document.createElement('li');
    searchItem.textContent = zipCode;
    searchItem.addEventListener('click', function() {
      document.getElementById('city-enter').value = zipCode;
      document.getElementById('subBtn').click();
    });
    dropdownMenu.prepend(searchItem);
  }
}

var clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', function() {
  const dropdownMenu = document.getElementById('dropdownitems');
  dropdownMenu.innerHTML = '';
});

var submitBtn = document.getElementById('subBtn');
submitBtn.addEventListener('click', function(event) {
  event.preventDefault();
  var enteredZipCode = document.getElementById('city-enter').value;
  fetchWeatherByZip(enteredZipCode);
  saveSearch(enteredZipCode);
});
