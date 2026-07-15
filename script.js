const apiKey="877e79dd6152d9f6913bce4c77c0cfb4";
const searchBtn=document.getElementById("search-btn");
const cityInput =document.getElementById("city-input");

searchBtn.addEventListener("click",()=>{
    const city = cityInput.value.trim();
    if(city === "")return;
    getWeather(city);
});

async function getWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const response = await fetch(url);
        const data = await response.json();

        if(data.cod !=200){
            showError();
            return;
        }
        showWeather(data);
    }catch (error){
        
            showError();
    }
}

function showError() {
  document.querySelector(".weather-container").style.display = "none";
  document.querySelector(".details-container").style.display = "none";
  document.querySelector(".error-container").style.display = "block";
}

function showWeather(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("date").textContent = new Date().toDateString();
  document.getElementById("temperature").textContent = Math.round(data.main.temp) + "°C";
  document.getElementById("condition").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = data.main.humidity + "%";
  document.getElementById("wind").textContent = Math.round(data.wind.speed) + " mph";
  document.getElementById("feels-like").textContent = Math.round(data.main.feels_like) + "°C";

  const iconCode = data.weather[0].icon;
  document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.querySelector(".weather-container").style.display = "block";
  document.querySelector(".details-container").style.display = "flex";
  document.querySelector(".error-container").style.display = "none";
}