const { getForecastWeather } = require("./axios");
const { botMessage } = require("./botMessage");

const isMessageWeather = async (chatId, bot) => {
  const { list } = await getForecastWeather();
  const { dt_txt, main, weather, clouds, wind } = list[0];
  return bot.sendMessage(
    chatId,
    botMessage(dt_txt, main, weather, clouds, wind)
  );
};

module.exports = { isMessageWeather };
