const axios = require("axios");
const { forecastApiId } = require("./getToken");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const town = "Ternopil";
// axios.defaults.baseURL = `http://api.openweathermap.org/data/2.5/forecast?APPID=${forecastApiId}&units=metric&cnt=1&q=${town}`;

const getForecastWeather = async () => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?APPID=${forecastApiId}&units=metric&cnt=1&q=${town}`
    );

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error.message);
  }
};

const currentDate = new Date();

const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = currentDate.getFullYear();

const formattedDate = `${day}.${month}.${year}`;

const getPryvatCurrency = async () => {
  try {
    const response = await axios.get(
      `https://api.privatbank.ua/p24api/exchange_rates?date=${formattedDate}`
    );

    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних з Приват:", error.message);
  }
};

const getMonoCurrency = async () => {
  try {
    const response = await axios.get(`https://api.monobank.ua/bank/currency`);
    myCache.set("monoCurrencyKey", response.data);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні даних з МоноБанку:", error.message);
    let oldResponce = [];
    return (oldResponce = myCache.get("monoCurrencyKey"));
  }
};
module.exports = { getForecastWeather, getPryvatCurrency, getMonoCurrency };
