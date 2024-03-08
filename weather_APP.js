const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key

function getWeather() {
    const zipCode = document.getElementById('zipCode').value;
    if (!zipCode) {
        alert('Please enter a zip code.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Weather data not found.');
        }
        return response.json();
    })
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        alert(error.message);
    });
}

function displayWeather(data) {
    const highTemp = kelvinToFahrenheit(data.main.temp_max).toFixed(2);
    const lowTemp = kelvinToFahrenheit(data.main.temp_min).toFixed(2);
    const humidity = data.main.humidity;
    const forecast = data.weather[0].description;

    document.getElementById('highTemp').textContent = `High: ${highTemp} °F`;
    document.getElementById('lowTemp').textContent = `Low: ${lowTemp} °F`;
    document.getElementById('forecast').textContent = `Forecast: ${forecast}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
}

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

// Uncomment the line below to get weather data on page load for a default zip code
// window.onload = () => getWeather('10001');


