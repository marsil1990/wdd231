// select HTML elements in the document
/* <li id="temp"></li>
<li id="desc"></li>
<li id="high"></li>
<li id="low"></li>
<li id="humidity"></li>
<li id="sunrise"></li>
<li id="sunset"></li> */
const currentTemp = document.querySelector("#temp");
const currentdesc = document.querySelector("#desc");
const currentTempHigh = document.querySelector("#high");
const currentSunRise = document.querySelector("#sunrise");
const currentHumidity = document.querySelector("#humidity");
const currentTempLow = document.querySelector("#low");
const currentSunSet = document.querySelector("#sunset");
const weatherIcon = document.querySelector("#weather-icon");

const urlForecast =
  "https://api.openweathermap.org/data/2.5/forecast?lat=-34.888&lon=-56.155&appid=d6579b8f802b0b37a7e09ccfebc7cd69&units=metric";
const url =
  "https://api.openweathermap.org/data/2.5/weather?lat=-34.888&lon=-56.155&appid=d6579b8f802b0b37a7e09ccfebc7cd69&units=metric";
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      // testing only
      displayResults(data); // uncomment when ready
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function apiForecast() {
  try {
    const response = await fetch(urlForecast);
    if (response.ok) {
      const data = await response.json();
      // testing only
      displayResultsForecast(data); // uncomment when ready
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();
apiForecast();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  currentdesc.textContent = `${data.weather[0].description}`;
  currentTempHigh.innerHTML = `<span>High: </span>${data.main.temp_max.toFixed(
    1
  )}&deg;C`;
  currentTempLow.innerHTML = `<span>Low: </span>${data.main.temp_min.toFixed(
    1
  )}&deg;C`;
  const sunrise = new Date(data.sys.sunrise * 1000);
  const sunset = new Date(data.sys.sunset * 1000);
  currentSunRise.innerHTML = `<span>Sunrise: </span>${sunrise.toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )}`;
  currentSunSet.innerHTML = `<span>Sunset: </span>${sunset.toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )}`;
  currentHumidity.innerHTML = `<span>Humidity: </span>${data.main.humidity}%`;
  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", `${data.weather[0].description}`);
  currentdesc.textContent = `${data.weather[0].description}`;
}

function displayResultsForecast(data) {
  const today = data.list[0];
  const tomorrow = data.list[8]; // 24h
  const afterTomorrow = data.list[16]; // 48h

  //
  const date1 = new Date(today.dt * 1000);
  const dayName1 = date1.toLocaleDateString("en-US", { weekday: "long" });
  const temp1 = Math.round(today.main.temp);

  document.getElementById("day1").textContent = `${dayName1}: ${temp1}°C`;

  //
  const date2 = new Date(tomorrow.dt * 1000);
  const dayName2 = date2.toLocaleDateString("en-US", { weekday: "long" });
  const temp2 = Math.round(tomorrow.main.temp);

  document.getElementById("day2").textContent = `${dayName2}: ${temp2}°C`;

  //
  const date3 = new Date(afterTomorrow.dt * 1000);
  const dayName3 = date3.toLocaleDateString("en-US", { weekday: "long" });
  const temp3 = Math.round(afterTomorrow.main.temp);

  document.getElementById("day3").textContent = `${dayName3}: ${temp3}°C`;
}
