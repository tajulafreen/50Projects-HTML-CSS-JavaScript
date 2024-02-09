const input = document.getElementById("input");
const btn = document.getElementById("btn");
const apiKey = "e3a46268fdc2475cb63214712240202";
const cityName = document.getElementById("city-name");
const dateTime = document.getElementById("date-time");
const condition = document.getElementById("condition");
const condition2 = document.getElementById("condition2");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const country = document.getElementById("country");
const locat = document.getElementById("getlocation");
const cities = document.getElementsByClassName("city");
const icon = document.getElementById("icon");

const fetchData = async (url) => {
  try {
    const data = await fetch(url);
    if (!data.ok) {
      throw new Error(data.statusText);
    }
    return data.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateWeatherInfo = (result) => {
  cityName.innerText = `${result.location.name}`;
  country.innerText = `${result.location.country}`;
  dateTime.innerText = `${result.location.localtime}`;
  temp.innerText = `${result.current.temp_c} °C`;
  humidity.innerText = `${result.current.humidity} %`;
  condition.innerText = `${result.current.condition.text}`;
  condition2.innerText = `${result.current.condition.text}`;
  icon.src = `${result.current.condition.icon}`; // Set the src attribute of the img tag with id "icon"
};
const getData = async (cityName) =>
  fetchData(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
  );

const getlocation = async (lat, long) =>
  fetchData(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}&aqi=no`
  );

const gotlocation = async (position) => {
  try {
    const result = await getlocation(
      position.coords.latitude,
      position.coords.longitude
    );
    updateWeatherInfo(result);
  } catch (error) {
    cityName.innerText = "Error fetching weather based on location";
  }
};
const failedlocation = () => console.log("failed to locate location");

btn.addEventListener("click", async () => {
  try {
    const { value } = input;
    const result = await getData(value);
    updateWeatherInfo(result);
    console.log(result);
  } catch (error) {
    cityName.innerText = "Error to fetch weather";
  }
});

locat.addEventListener("click", () =>
  navigator.geolocation.getCurrentPosition(gotlocation, failedlocation)
);
const citiesArray = [...cities];
citiesArray.forEach((element) => {
  element.addEventListener("click", async () => {
    const cityName = element.innerText; // Extract city name from the clicked element
    const result = await getData(cityName); // Pass the city name to getData
    updateWeatherInfo(result);
  });
});
