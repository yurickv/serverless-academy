const axios = require("axios");
const { forecastApiId } = require("./getToken");

const town = "Ternopil";
axios.defaults.baseURL = `http://api.openweathermap.org/data/2.5/forecast?APPID=${forecastApiId}&units=metric&cnt=1&q=${town}`;

const getForecastWeather = async () => {
  try {
    const response = await axios.get();
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.message);
  }
};

module.exports = { getForecastWeather };
