const { token, botChatId } = require("./getToken");
const { getForecastWeather, getPryvatCurrency } = require("./axios");
const { botMessage } = require("./botMessage");
const { isMessageWeather } = require("./reqWeatherProcessing");
const { isMessageCurrency } = require("./reqCurrencyProcessing");
module.exports = {
  token,
  botChatId,
  getForecastWeather,
  botMessage,
  isMessageWeather,
  getPryvatCurrency,
  isMessageCurrency,
};
