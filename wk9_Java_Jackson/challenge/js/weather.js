
var cityInput = document.getElementById("cityInput");
var getWeatherBtn = document.getElementById("getWeatherBtn");
var weatherDiv = document.getElementById("weather");
var messageDiv = document.getElementById("message");


function titleCase(str) {
    var words = str.toLowerCase().split(' ');
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}

function displayError(message) {
    weatherDiv.innerHTML = '';
    messageDiv.innerHTML = '<div class="error">' + message + '</div>';
}

function displayWeather(data) {
    var cityName = data.name;
    if (data.sys && data.sys.country) {
        cityName += ', ' + data.sys.country;
    }

    var html = '<div class="icon-wrap">';
    html += '<img class="weather-icon" src="https://openweathermap.org/img/wn/' + 
            data.weather[0].icon + '@2x.png" alt="' + data.weather[0].description + '">';
    html += '<div>';
    html += '<div class="muted">' + cityName + '</div>';
    html += '<div class="temp">' + Math.round(data.main.temp) + '°C</div>';
    html += '<div>' + titleCase(data.weather[0].description) + '</div>';
    html += '<div class="muted">Humidity: ' + data.main.humidity + '% &middot; Wind: ' + 
            Math.round(data.wind.speed) + ' m/s</div>';
    html += '</div></div>';

    weatherDiv.innerHTML = html;
    messageDiv.innerHTML = '';
}

function getWeather() {
    var city = cityInput.value.trim();
    
    if (!city) {
        displayError('Please enter a city name.');
        return;
    }

    getWeatherBtn.disabled = true;
    messageDiv.textContent = 'Loading weather data...';

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        getWeatherBtn.disabled = false;
        messageDiv.textContent = '';

        if (xhr.status === 200) {
            try {
                var response = JSON.parse(xhr.responseText);
                displayWeather(response);
            } catch (e) {
                displayError('Could not parse weather data.');
            }
        } else {
            try {
                var errorData = JSON.parse(xhr.responseText);
                displayError(errorData.message || 'Could not get weather data.');
            } catch (e) {
                displayError('Could not get weather data.');
            }
        }
    };

    xhr.onerror = function() {
        getWeatherBtn.disabled = false;
        displayError('Could not connect to weather service.');
    };

    xhr.open('GET', url, true);
    xhr.send(null);
}

// Event Handlers
getWeatherBtn.onclick = getWeather;
cityInput.onkeypress = function(e) {
    if (e.keyCode === 13) {
        getWeather();
    }
};
