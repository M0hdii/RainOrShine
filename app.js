document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

async function getWeather(city) {
    let url = '';
    if (city.trim() !== '') {
        url = `/api/weather?city=${city}`;
        fetchWeather(url);
    } else {
        alert('Please enter a city name.');
    }
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather data not available');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `
        <h2>Weather for ${data.city}</h2>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Condition: ${data.condition}</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}
