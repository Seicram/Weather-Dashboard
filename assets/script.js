function fetchWeather(url, containerId) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherContainer = document.getElementById(containerId);
      weatherContainer.innerHTML = '';

      const forecasts = data.list.slice(0, 6); // Extract the forecasts for the next 6 days

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
            <p class="date">${formatDate(date)}</p>
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

// Date format
function formatDate(date) {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function getDayOfWeek(dayIndex) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[dayIndex];
}

var fetchWeatherByZip = function() {
  var zipCode = document.getElementById('zip-enter').value; // Get the value of the input field
  var enteredCity = 'https://api.openweathermap.org/geo/1.0/zip?zip=' + zipCode + '&appid=986979ba094605639e44eaca0a6e1e44';


  fetch(enteredCity)
    .then(response => response.json())
    .then(data => {
      var lat = data.lat;
      var lon = data.lon;
      var loadWeather = 'https://api.openweathermap.org/data/2.5/forecast/?lat=' + lat + '&lon=' + lon + '&cnt=6&appid=986979ba094605639e44eaca0a6e1e44&units=imperial';

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
              <p class="date">${formatDate(todayDate)}</p>
              <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
              <p class="temperature">${temperature}°F</p>
              <p class="humidity">Humidity: ${humidity}%</p>
            </div>
          `;
          document.getElementById('sameday').innerHTML = todayHtml;

          // Save the search history
          saveSearchHistory(zipCode);

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

// Function to save the search history
function saveSearchHistory(zipCode) {
  var searchHistory = localStorage.getItem('searchHistory'); // Get the existing search history from local storage

  if (searchHistory) {
    searchHistory = JSON.parse(searchHistory); // Parse the JSON string to an object

    // Check if the zip code already exists in the search history
    if (!searchHistory.includes(zipCode)) {
      searchHistory.unshift(zipCode); // Add the new zip code to the beginning of the array
    }
  } else {
    searchHistory = [zipCode]; // Create a new array with the zip code if no search history exists
  }

  localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); // Save the updated search history to local storage
  loadSearchHistory(); // Reload the search history
}

// Function to load the search history
function loadSearchHistory() {
  var searchHistory = localStorage.getItem('searchHistory');

  if (searchHistory) {
    searchHistory = JSON.parse(searchHistory); // Parse the JSON string to an object

    var dropdownItems = document.getElementById('dropdownitems');

    // Clear the existing dropdown items
    dropdownItems.innerHTML = '';

    // Add the search history items to the dropdown
    searchHistory.forEach(zipCode => {
      var dropdownItem = document.createElement('li');
      dropdownItem.innerHTML = `<a href="#" onclick="retrieveWeatherByZip('${zipCode}')">${zipCode}</a>`;
      dropdownItems.appendChild(dropdownItem);
    });
  }
}

// Function to retrieve weather data by zip code from the search history
function retrieveWeatherByZip(zipCode) {
  document.getElementById('zip-enter').value = zipCode; // Set the zip code in the input field
  fetchWeatherByZip(); // Fetch weather data for the selected zip code
}

// Event listener for the Submit button
document.getElementById('subBtn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting
  fetchWeatherByZip();
});

// Event listener for the Clear Searches button
document.getElementById('clearBtn').addEventListener('click', function() {
  localStorage.removeItem('searchHistory'); // Remove the search history from local storage
  document.getElementById('dropdownitems').innerHTML = ''; // Clear the dropdown items
});

// Load the search history when the page loads
loadSearchHistory();
