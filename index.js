/*console.log("Hello Mohit Singh");

const API_key = "a0cda3d092110ba513a84c6abdbe43aa";
let data;

async function fetchWeatherDetail() {
    let latitude = 28.6062607;
    // 28.606628
    let longitude = 77.0572549;
    // 77.0601531
        
    try {
        let city = "Goa";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=metric`);
        const data = await response.json();
        console.log("Weather data : ", data);

        // let newPara = document.createElement("p");
        // newPara.textContent = data.main.temp + " °C";
        // newPara.textContent = data;
        // newPara.textContent = `${data?.main?.temp.toFixed(2)} C`
        // document.body.appendChild(newPara);
        
        renderWeatherInfo(data);
    }
    catch(err) {
        console.log("Error : ", err);
    }   
}

async function renderWeatherInfo(data) {
    let newPara = document.createElement("p");
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
    document.body.appendChild(newPara);
}*/

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const userInfoContainer = document.querySelector(".user-info-container");
const loadingScreen = document.querySelector(".loading-container");
const notFoundScreen = document.querySelector(".not-found-container");

const API_KEY = "a0cda3d092110ba513a84c6abdbe43aa";

let currentTab = userTab;
currentTab.classList.add("current-tab");

// initial function call
getFromSessionStorage();

function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
        
        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");

            getFromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

// checks if coordinates are already present in session storage
function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    
    if (!localCoordinates) {
        // if local coordinates are not present, it means we have not granted location permission
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);

        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, long} = coordinates;

    // make grant container invisible
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // API call
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`);
        
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active");
        console.log("Error", err);
    }
}

function renderWeatherInfo(weatherInfo) {
    // firstly, we have to fetch the elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    if (weatherInfo?.cod === '404') {
        notFoundScreen.classList.add("active");
        userInfoContainer.classList.remove("active");
        userInfoContainer.classList.remove("sub-container");
        // return;
    } else {
        userInfoContainer.classList.add("sub-container");
        // fetch values from weatherInfo object and put it UI elements
        notFoundScreen.classList.remove("active");
        cityName.innerText = weatherInfo?.name;
        countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
        desc.innerText = weatherInfo?.weather?.[0]?.description;
        weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
        temp.innerText = `${weatherInfo?.main?.temp} °C`;
        windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
        humidity.innerText = `${weatherInfo?.main?.humidity}%`;
        cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("No geolocation support is available on your device");
    }
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

let searchInput = document.querySelector("[data-searchInput]")
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (searchInput.value === "") return;

    fetchSearchWeatherInfo(searchInput.value);
})

async function fetchSearchWeatherInfo(city) {
    searchInput.value = "";
    loadingScreen.classList.add("active");
    notFoundScreen.classList.remove("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);
    }
    catch (e) {
        alert("Error");
    }
}