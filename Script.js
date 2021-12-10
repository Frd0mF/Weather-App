import Icon from './Assets/Icon.png'
import './Style.css'

const APIKey = 'b91565fa47e047037781330d85009ef7';
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
const daysRow = document.querySelectorAll('.days');
const tempRow = document.querySelectorAll('.temp');
const humidityRow = document.querySelectorAll('.humidity');
const chanceOfRainRow = document.querySelectorAll('.COR');
const iconRow = document.querySelectorAll('.icon');
const date = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weather-icon');
const country = document.getElementById('country');
const searchBtn = document.getElementById('search-btn');
const SearchBox = document.getElementById('city-search');
const weatherDesc = document.getElementById('weather-desc');
const hiLo = document.getElementById('hi-lo');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');
const chanceOfRain = document.getElementById('COR');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const feelsLike = document.getElementById('feel');
const pressure = document.getElementById('pressure');
const UV = document.getElementById('uv');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchedCity = SearchBox.value;
    getData(searchedCity);
})


//Today

function getData(searchedCity) {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${APIKey}`, { mode: 'cors' })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            getTime(response);
            getCity(response);
            getTemp(response);
            getCountry(response);
            getWeatherDesc(response);
            getHiLo(response);
            getLatLon(response);

        }).catch(function(err) {
            alert('Please enter a valid City/Country');

        });

}

function getTime(response) {
    let apiDate = new Date(response.dt * 1000);
    apiDate = String(apiDate).split(" ");
    date.textContent = apiDate[0] + ', ' + apiDate[2] + ' ' + apiDate[1] + ' ' + apiDate[3];
}

function getCity(response) {
    let apiCity = response.name;
    city.textContent = apiCity;
}

function getTemp(response) {
    let apiTemp = response.main.temp;
    let apiIcon = response.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${apiIcon}@4x.png`;
    temp.textContent = `${Math.round(apiTemp)}°`;
}

function getCountry(response) {
    let apiCountry = response.sys.country;
    country.src = `https://flagcdn.com/h240/${apiCountry.toLowerCase()}.png`;
}

function getWeatherDesc(response) {
    let desc = response.weather[0].description;
    weatherDesc.textContent = desc;
}

function getHiLo(response) {
    let hi = response.main.temp_max;
    let lo = response.main.temp_min;
    hiLo.innerHTML = `
    <p id="high">H: ${Math.round(hi)}&deg</p>
    <p id="low">L: ${Math.round(lo)}&deg</p>
`
}

function getLatLon(response) {
    getPredictionsData(response.coord.lat, response.coord.lon);
}


//Predictions

function getPredictionsData(lat, lon) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&units=metric&appid=${APIKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            getDays(response);
            getPredicTemp(response);
            getPredicHumidity(response);
            getPredicCOR(response);
            getPredicIcon(response);
            getSunrise(response);
            getSunset(response);
            getWind(response);
            getFeel(response);
            getPressure(response);
            getUV(response);
        })
}


function getDays(response) {
    for (let i = 1; i < 8; i++) {
        let apiDay = new Date(response.daily[i].dt * 1000);
        apiDay = apiDay.getDay();
        daysRow[i - 1].textContent = days[apiDay];
    }
}


function getPredicTemp(response) {
    for (let i = 1; i < 8; i++) {
        let apiPredicTempH = Math.round(response.daily[i].temp.max);
        let apiPredicTempL = Math.round(response.daily[i].temp.min);
        tempRow[i - 1].textContent = apiPredicTempH + '\u00B0' + ' ' + apiPredicTempL + '\u00B0';
    }
}

function getPredicHumidity(response) {
    for (let i = 1; i < 8; i++) {
        let apiPredicHum = response.daily[i].humidity;
        humidityRow[i - 1].textContent = apiPredicHum + '%';
    }
    let apiPredicHum = response.daily[0].humidity;
    humidity.textContent = apiPredicHum + '%';
}

function getPredicCOR(response) {
    for (let i = 1; i < 8; i++) {
        let apiPredicCOR = response.daily[i].pop;
        chanceOfRainRow[i - 1].textContent = Math.round(apiPredicCOR * 100) + '%';
    }
    let apiPredicCOR = response.daily[0].pop;
    chanceOfRain.textContent = Math.round(apiPredicCOR * 100) + '%';
}

function getPredicIcon(response) {
    for (let i = 1; i < 8; i++) {
        let apiPredicIcon = response.daily[i].weather[0].icon;
        iconRow[i - 1].src = `https://openweathermap.org/img/wn/${apiPredicIcon}.png`;
    }
}

function getSunrise(response) {
    let apiSunrise = new Date(response.daily[0].sunrise * 1000);
    apiSunrise = String(apiSunrise).split(" ");
    sunrise.textContent = apiSunrise[4];
}

function getSunset(response) {
    let apiSunset = new Date(response.daily[0].sunset * 1000);
    apiSunset = String(apiSunset).split(" ");
    sunset.textContent = apiSunset[4];
}

function getWind(response) {
    let apiWind = response.daily[0].wind_speed;
    wind.textContent = apiWind + 'KM/H';
}

function getFeel(response) {
    let apiFeel = Math.round(response.daily[0].feels_like.eve);
    feelsLike.textContent = apiFeel + '\u00B0';
}

function getPressure(response) {
    let apiPressure = Math.round(response.daily[0].pressure);
    pressure.textContent = apiPressure + 'hPa';
}

function getUV(response) {
    let apiUV = response.daily[0].uvi;
    UV.textContent = apiUV;
}


getData('Larache');