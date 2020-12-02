let appId = "6ed444d6f7f653e7509d479f373bd838";
let units = 'imperial';
let searchType;


function getSearchMethod(searchCity) {
    if(searchCity.length === 5 && Number.parseInt(searchCity) + '' === searchCity)
        searchType = 'zip';
    else 
        searchType = 'q';
}

function searchWeather(searchCity) {
        getSearchMethod(searchCity);

        fetch(`http://api.openweathermap.org/data/2.5/weather?${searchType}=${searchCity}&APPID=${appId}&units=${units}`).then(result => {
            return result.json();
        }).then(result => {
            backPic(result);
        })
     const myCity = searchCity;  
     localStorage.setItem("myLocalStore", myCity); 
}

function backPic(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        case 'Rain':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let feelsLikeElement = document.getElementById('feelsLike');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText= resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) +'&#176' + 'F';
    windSpeedElement.innerHTML = "Winds at " + Math.floor(resultFromServer.wind.speed * 2.23694)  + ' mph';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity at ' + resultFromServer.main.humidity + '%';
    feelsLikeElement.innerHTML ='Feels like ' + Math.floor(resultFromServer.main.feels_like) + '&#176' + 'F';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContianerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContianerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}


document.getElementById('searchBtn').addEventListener('click', () => {
    let searchCity = document.getElementById('searchInput').value;
    if (searchCity)
        searchWeather(searchCity);
})
