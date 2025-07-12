// //------- Const for API Key -------//
// const apiKey = '290fef669d9ca6c626cd0dc79692a9bc';  // Always replace with your actual OpenWeatherMap API key

// //------- Async/Await with Fetch -------//
// async function getWeather() {
//     //------- Template Literals and Const -------//
//     const city = document.getElementById('cityInput').value;
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     try 
//     {
//         //------- Await with Fetch -------//
//         const response = await fetch(url);
//         if (!response.ok) {
//             //------- Throw in Async/Await Context -------//
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         //------- Destructuring JSON Response -------//
//         const data = await response.json();
//         displayWeather(data);
//     }

//     catch (error) 
//     {
//         console.error('Failed to fetch weather data:', error);
//         alert('Failed to fetch weather data.');
//     }
// }

// function displayWeather(data) {
//     //------- Destructuring for Easier Access to Nested Data -------//
//     const { main: { temp, humidity }, weather, wind: { speed }, sys: { country }, name } = data;
//     const [{ main: weatherMain, description, icon }] = weather;  // Nested Destructuring

//     //------- Const for DOM Manipulation -------//
//     const weatherDisplay = document.getElementById('weatherDisplay');
//     if (data.cod !== 200) {
//         weatherDisplay.innerHTML = `<p>Error: ${data.message}</p>`;
//         return;
//     }

//     //------- Template Literals for HTML Generation -------//
//     const weatherHTML = `
//         <h2>Weather in ${name}, ${country}</h2>
//         <p>Temperature: ${temp} °C</p>
//         <p>Weather: ${weatherMain} (${description})</p>
//         <p>Humidity: ${humidity}%</p>
//         <p>Wind: ${speed} m/s</p>
//         <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon">
//     `;
//     weatherDisplay.innerHTML = weatherHTML;
// }


const apiKey = '4f74c11581fe9f6c6989c471ed46871f';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherDisplay = document.getElementById('weatherDisplay');

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.error.info || "Unknown error");
        }

        displayWeather(data);
    } catch (error) {
        console.error("Weather fetch error:", error);
        weatherDisplay.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { location, current } = data;

    const weatherHTML = `
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p>Temperature: ${current.temperature} °C</p>
        <p>Weather: ${current.weather_descriptions[0]}</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind Speed: ${current.wind_speed} km/h</p>
        <img src="${current.weather_icons[0]}" alt="Weather icon">
    `;

    document.getElementById('weatherDisplay').innerHTML = weatherHTML;
}
