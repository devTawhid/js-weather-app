const condition = document.getElementById('condition');
const city = document.getElementById('city');
const country = document.getElementById('country');
const mainText = document.getElementById('main');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');

const cityInput = document.getElementById('city-input');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');

const API_KEY = '16eb949ede125b375417789d5b0abef0';
const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const ICON_URL = 'http://openweathermap.org/img/w/';
const DEFAULT_CITY = 'dhaka,bd';

window.addEventListener('load', function() {
    navigator.geolocation.getCurrentPosition(s => {
        getWeatherData(null, s.coords);
        // console.log(e.lat, e.lng);
        // console.log(s.coords.latitude, s.coords.longitude);
    }, e => {
        getWeatherData();
        alert(e);
    });
});

function getWeatherData(cityName = DEFAULT_CITY, s = null){
    let url = `${BASE_URL}`;
    cityName === null ?
        url = `${url}&lat=${s.latitude}&lon=${s.longitude}`:
        url = `${url}&q=${cityName}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => putData(data));
}

function putData(data) {
    condition.src = `${ICON_URL}${data.weather[0].icon}.png`;
    city.innerText = `${data.name}`;
    country.innerText = `${data.sys.country}`;
    mainText.innerText = `${data.weather[0].main}`;
    description.innerText = `${data.weather[0].description}`;
    temp.innerText = `${data.main.temp}`;
    pressure.innerText = `${data.main.pressure}`;
    humidity.innerText = `${data.main.humidity}`;
}
