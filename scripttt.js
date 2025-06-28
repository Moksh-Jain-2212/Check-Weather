document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeather = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const temperature = document.getElementById("temperature");
    const City = document.getElementById("city-name");
    const description = document.getElementById("description");
    const error = document.getElementById("error-message");

    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; //env variables

    getWeather.addEventListener('click', async() => {
        let city = cityInput.value.trim();
        if(!city) return;

        try {
            const weather = await getWeatherData(city);
            console.log(weather);
            displayWeatherData(weather);
        } catch (error) {
            showerror();
        }
    })


    async function getWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        // console.log((response));
        if(response.ok)
        {
            const convert = await response.json();
            return convert;
            // console.log(convert);
        }
        else
        {
            throw new Error("City Not Found");
        }
    }

    function displayWeatherData(weatherData) {
        const {name,main,weather} = weatherData;
        City.innerHTML = name;
        temperature.innerHTML = main.temp;
        description.innerHTML = weather[0].description;
        weatherInfo.classList.remove('hidden');
        error.classList.add('hidden');
    }

    function showerror()
    {
        weatherInfo.classList.add('hidden');
        error.classList.remove('hidden');
    }
})







//    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
