const input = document.getElementById('input');
const btn = document.getElementById('btn');
const apiKey = 'e3a46268fdc2475cb63214712240202';
const cityName = document.getElementById('city-name');
const dateTime = document.getElementById('date-time');
// const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const country = document.getElementById('country');
const locat = document.getElementById('getlocation');

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
};
const getData = async (cityName) => fetchData(
  `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`,
);

const getlocation = async (lat, long) => fetchData(
  `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}&aqi=no`,
);

const gotlocation = async (position) => {
  try {
    const result = await getlocation(
      position.coords.latitude,
      position.coords.longitude,
    );
    updateWeatherInfo(result);
  } catch (error) {
    cityName.innerText = 'Error fetching weather based on location';
  }
};
const failedlocation = () => console.log('failed to locate location');

btn.addEventListener('click', async () => {
  try {
    const { value } = input;
    const result = await getData(value);
    updateWeatherInfo(result);
  } catch (error) {
    cityName.innerText = 'Error to fetch weather';
  }
});

locat.addEventListener('click', () => navigator.geolocation.getCurrentPosition(gotlocation, failedlocation));
