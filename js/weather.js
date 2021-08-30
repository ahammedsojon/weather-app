const key = '120d11ab5b57788c29a4198b6a775130';
const city = 'dhaka';
const spinners = document.getElementById('spinners');
const loadWeather = () => {
    const searchField = document.getElementById('search-field');
    const searchVal = searchField.value;
    // clar data
    searchField.value = '';
    const city = document.getElementById('city-name');
    city.innerHTML = '';
    const img = document.getElementById('img');
    img.src = '';
    const temp = document.getElementById('temperature');
    temp.innerHTML = '';
    const main = document.getElementById('weather-main');
    main.innerHTML = '';
    spinners.classList.remove('d-none');
    if (searchVal == '') {
        spinners.classList.add('d-none');
        city.innerHTML = 'please search a valid city name';
    }
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${key}`)
            .then(response => response.json())
            .then(data => displayWeatherData((data)))
    }
}
const displayWeatherData = weather => {
    const city = document.getElementById('city-name');
    if (!weather.name) {
        spinners.classList.add('d-none');
        city.innerHTML = 'please search a valid city name';
    } else {
        spinners.classList.add('d-none');

        // weather city
        city.innerHTML = `${weather.name}`;

        // weather img
        const img = document.getElementById('img');
        const weatherIconCode = `${weather.weather[0].icon}`;
        const weatherIcon = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
        img.src = `${weatherIcon}`;

        // weather temperature
        const temp = document.getElementById('temperature');
        const tempMain = `${weather.main.temp}` - 273.15;
        temp.innerHTML = `${Math.round(tempMain)}&deg;C`;

        // weather condition
        const main = document.getElementById('weather-main');
        main.innerText = `${weather.weather[0].main}`;
    }
}