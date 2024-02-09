const input = document.getElementById('input');
const btn = document.getElementById('btn');
const apiKey = 'e3a46268fdc2475cb63214712240202';
const cityName = document.getElementById('city-name');
const dateTime = document.getElementById('date-time');
const condition2 = document.getElementById('condition2');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const countryy = document.getElementById('country');
const locat = document.getElementById('getlocation');
const cities = document.getElementsByClassName('city');
const icon = document.getElementById('icon');
const body = document.querySelector('.weather-app');
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
  const { error, location, current } = result;
  if (error) {
    cityName.innerText = `Error: ${error.message}`;
    [countryy, dateTime, temp, humidity, condition2, icon].forEach((elem) => {
      elem.innerText = '';
    });
    icon.src = '';
  } else {
    const { name, country, localtime } = location;
    console.log(country);
    cityName.innerText = name;
    countryy.innerText = country;
    dateTime.innerText = localtime;
    temp.innerText = `${current.temp_c} °C`;
    humidity.innerText = `${current.humidity} %`;
    condition2.innerText = current.condition.text;
    icon.src = current.condition.icon;

    const isDay = current.is_day === 1 ? 'day' : 'night';
    const codes = [
      [1000, 10000, 10001, 1100, 11001, 11000, 51190, 60030], // clear
      [
        1101, 11011, 11010, 11021, 11020, 1102, 1001, 10010, 10011, 1003, 1150,
        1153, 1168, 1147, 1135, 1087, 1003, 1006, 1207, 1009,
      ], // cloudy
      [
        1261, 1273, 1276, 1274, 1246, 1243, 1240, 1201, 1204, 1198, 1192, 1195,
        1189, 1186, 1183, 1180, 1186,
      ], // rainy
      [
        1030, 1066, 1168, 1171, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255,
        1258, 1279, 1282,
      ], // snowy
    ];
    const imageUrls = [
      `./images/${isDay}/clear.jpg`,
      `./images/${isDay}/cloudy.jpg`,
      `./images/${isDay}/rainy.jpg`,
      `./images/${isDay}/snowy.jpg`,
    ];

    for (let i = 0; i < codes.length; i += 1) {
      if (codes[i].includes(current.condition.code)) {
        body.style.backgroundImage = `url('${imageUrls[i]}')`;
        console.log(imageUrls[i]);
        break;
      }
    }
  }
};
const getData = async (cityName) => {
  try {
    const result = await fetchData(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`,
    );
    return result;
  } catch (error) {
    return {
      error: { message: 'Failed to fetch data. Please try again later.' },
    };
  }
};
const getlocation = async (lat, long) => fetchData(
  `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}&aqi=no`,
);

const gotlocation = async (position) => {
  try {
    const result = await getlocation(
      position.coords.latitude,
      position.coords.longitude,
    );
    console.log(result);
    updateWeatherInfo(result);
  } catch (error) {
    cityName.innerText = 'Error fetching weather based on location';
  }
};
const failedlocation = () => console.log('failed to locate location');

btn.addEventListener('click', async (e) => {
  try {
    if (input.value.length === 0) {
      alert('Please type a city name');
    } else {
      const { value } = input;
      const result = await getData(value);
      console.log(result);
      updateWeatherInfo(result);
      console.log(result);
    }
  } catch (error) {
    cityName.innerText = 'Error to fetch weather';
  }
  e.preventDefault();
});

locat.addEventListener('click', () => navigator.geolocation.getCurrentPosition(gotlocation, failedlocation));
const citiesArray = [...cities];
citiesArray.forEach((element) => {
  element.addEventListener('click', async () => {
    const cityName = element.innerText;
    const result = await getData(cityName);
    updateWeatherInfo(result);
  });
});

window.addEventListener('load', async () => {
  navigator.geolocation.getCurrentPosition(gotlocation, failedlocation);
});
