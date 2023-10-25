const { token, botChatId } = require("./getToken");
const { getForecastWeather } = require("./axios");
const { botMessage } = require("./botMessage");
module.exports = { token, botChatId, getForecastWeather, botMessage };
