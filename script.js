// Function to fetch weather data for a given city
class WeatherInfo {
  constructor(city) {
    this.city = city;
    this.apiKey = '5783a189de7047ed9c054931241905'; // Replace with your actual API key
  }

  async fetchData() {
    try {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.current;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  displayTemperature() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const tempC = weatherData.temp_c;
        document.getElementById(`temp-${this.city}`).textContent = `${tempC}°C`;
      }
    });
  }

  displayFeelsLike() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const feelsLikeC = weatherData.feelslike_c;
        document.getElementById(`feels_like-${this.city}`).textContent = `${feelsLikeC}°C`;
      }
    });
  }

  displayConditionText() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const conditionText = weatherData.condition.text;
        document.getElementById(`condition-text-${this.city}`).textContent = conditionText;
      }
    });
  }

  displayConditionIcon() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const conditionIcon = weatherData.condition.icon;
        document.getElementById(`condition-icon-${this.city}`).setAttribute('src', conditionIcon);
      }
    });
  }

  displayWindSpeed() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const windMph = weatherData.wind_mph;
        document.getElementById(`wind-speed-${this.city}`).textContent = `${windMph} mph`;
      }
    });
  }

  displayWindDirection() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const windDegree = weatherData.wind_degree;
        const windDir = this.getWindDirection(windDegree);
        document.getElementById(`wind-dir-${this.city}`).textContent = windDir;
      }
    });
  }

  displayHumidity() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const humidity = weatherData.humidity;
        document.getElementById(`humidity-${this.city}`).textContent = `${humidity}%`;
      }
    });
  }

  displayPressure() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const pressureMb = weatherData.pressure_mb;
        document.getElementById(`pressure-${this.city}`).textContent = `${pressureMb} mb`;
      }
    });
  }

  displayPrecipitation() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const precipMm = weatherData.precip_mm;
        document.getElementById(`precip-${this.city}`).textContent = `${precipMm} mm`;
      }
    });
  }

  displayUvIndex() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const uvIndex = weatherData.uv;
        document.getElementById(`uv-index-${this.city}`).textContent = uvIndex;
      }
    });
  }

  displayVisibility() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const visibilityKm = weatherData.vis_km;
        document.getElementById(`visibility-${this.city}`).textContent = `${visibilityKm} km`;
      }
    });
  }

  displayGust() {
    this.fetchData().then(weatherData => {
      if (weatherData) {
        const gustMph = weatherData.gust_mph;
        document.getElementById(`gust-${this.city}`).textContent = `${gustMph} mph`;
      }
    });
  }

  getWindDirection(degree) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.floor((degree / 22.5) + 0.5);
    return directions[index % 16];
  }

  async fetchHistoricalData(date) {
    try {
      const apiUrl = `https://api.weatherapi.com/v1/history.json?key=${this.apiKey}&q=${this.city}&dt=${date}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.forecast.forecastday[0].hour;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return null;
    }
  }

  // async displayHourlyWeather(date) {
  //   const hourlyData = await this.fetchHistoricalData(date);
  //   if (hourlyData) {
  //     hourlyData.forEach((hour, index) => {
  //       document.getElementById(`hourly-temp-${index}-${this.city}`).textContent = `${hour.temp_c}°C`;
  //       document.getElementById(`hourly-feelslike-${index}-${this.city}`).textContent = `${hour.feelslike_c}°C`;
  //       document.getElementById(`hourly-wind-speed-${index}-${this.city}`).textContent = `${hour.wind_mph} mph`;
  //       document.getElementById(`hourly-condition-text-${index}-${this.city}`).textContent = hour.condition.text;
  //       document.getElementById(`hourly-condition-icon-${index}-${this.city}`).setAttribute('src', `https:${hour.condition.icon}`);
  //       document.getElementById(`hourly-rain-${index}-${this.city}`).textContent = `${hour.chance_of_rain}%`;
  //     });
  //   }
  // }

  async displayHourlyWeather(date) {
    const hourlyData = await this.fetchHistoricalData(date);
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = ''; // Clear previous data

    if (hourlyData) {
        const carousel = document.createElement('div');
        carousel.className = 'weather-carousel'; // Add a class for styling
        carousel.style.display = 'flex'; // Set display to flex for horizontal layout

        hourlyData.forEach((hour, index) => {
            const hourBox = document.createElement('div');
            hourBox.className = 'weather-box'; // Add a class for styling
            hourBox.innerHTML = `
                <div class="hour">${index}:00</div>
                <div class="temp">Temp: ${hour.temp_c}°C</div>
                <div class="feels-like">Feels like: ${hour.feelslike_c}°C</div>
                <div class="wind-speed">Wind: ${hour.wind_mph} mph</div>
                <div class="condition">
                    <img src="https:${hour.condition.icon}" alt="${hour.condition.text}">
                    <span>${hour.condition.text}</span>
                </div>
                <div class="rain-chance">Rain: ${hour.chance_of_rain}%</div>
            `;
            carousel.appendChild(hourBox);
        });

        weatherContainer.appendChild(carousel);
    }
}

}

// Create instances for different cities
const dhakaWeather = new WeatherInfo('dhaka');

// Call specific functions to display weather information
dhakaWeather.displayTemperature();
dhakaWeather.displayFeelsLike();
dhakaWeather.displayConditionText();
dhakaWeather.displayConditionIcon();
// Call other functions as needed

const cities = ['rangpur', 'chittagong', 'khulna', 'sylhet'];
const weatherInfos = cities.map(city => new WeatherInfo(city));

// Call specific functions to display weather information
weatherInfos.forEach(weatherInfo => {
  weatherInfo.displayTemperature();
  weatherInfo.displayFeelsLike();
  weatherInfo.displayHumidity();
  weatherInfo.displayWindSpeed();
  weatherInfo.displayConditionText();
  weatherInfo.displayConditionIcon();
});



// // Event listener for the search button
// document.querySelector('.btn-outline-success').addEventListener('click', function(event) {
//   event.preventDefault(); // Prevent the default form submission behavior
//   const city = document.querySelector('input[type="search"]').value;
//   if (city) {
//     window.location.href = `details.html?city=${encodeURIComponent(city)}`; // Redirect with the city parameter
//   } else {
//     // Handle the case where the search input is empty
//     // You can alert the user or disable the search button until input is provided
//   }
// });


document.addEventListener('DOMContentLoaded', function () {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  navbarPlaceholder.innerHTML = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html">Weather Forecast</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  `;

  // Add event listener for the search button
  document.querySelector('.btn-outline-success').addEventListener('click', function (event) {
      event.preventDefault();
      const city = document.querySelector('input[type="search"]').value;
      if (city) {
          window.location.href = `details.html?city=${encodeURIComponent(city)}`;
      } else {
          // Handle the case where the search input is empty
          // You can alert the user or disable the search button until input is provided
      }
  });
});


