const apiKey = "d96c38718df423e9ec10e2517774942d"; // Replace with your actual API key
const searchButton = document.getElementById("search-button");
const searchBox = document.getElementById("search-box");
const recentSearchList = document.getElementById("recent-search-list");
const temperatureElement = document.getElementById("temperature");
const locationElement = document.getElementById("location");
const conditionElement = document.getElementById("condition");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const detailsElement = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");

let recentSearches = [];

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Check if the city was found
    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    // Update the weather information on the page using the API response
    const temperature = data.main.temp;
    const location = data.name;
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    const date = new Date(data.dt * 1000);
    const details = `${location} ${date.toLocaleString()}`;

    // Update the content of the .weather-info class with API response
    temperatureElement.textContent = `${temperature}°C`;
    locationElement.textContent = location;
    conditionElement.textContent = condition;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windElement.textContent = `Wind: ${wind} km/h`;
    detailsElement.textContent = details;
    weatherIcon.src = icon;

    // Show the weather information by setting the display to block
    temperatureElement.style.display = "block";
    locationElement.style.display = "block";
    conditionElement.style.display = "block";
    humidityElement.style.display = "block";
    windElement.style.display = "block";
    detailsElement.style.display = "block";
    weatherIcon.style.display = "block";

    // Save recent searches if the city is not already in the list
    if (!recentSearches.includes(city)) {
      recentSearches.unshift(city);
      updateRecentSearchList();
    }

  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Error fetching weather data!");
  }
}

// Function to update the recent search list
function updateRecentSearchList() {
  recentSearchList.innerHTML = "";
  recentSearches.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => {
      fetchWeatherData(city); // Fetch weather for clicked city
    });
    recentSearchList.appendChild(li);
  });
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    fetchWeatherData(city);
    searchBox.value = ""; // Clear the search box
  } else {
    alert("Please enter a city name.");
  }
});
