const { token, botChatId } = require("./getToken");
const { getForecastWeather } = require("./axios");
const { botMessage } = require("./botMessage");
const { isMessageWeather } = require("./reqWeatherProcessing");
module.exports = {
  token,
  botChatId,
  getForecastWeather,
  botMessage,
  isMessageWeather,
};
