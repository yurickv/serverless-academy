const TelegramBot = require("node-telegram-bot-api");
// const commander = require("commander");
const { token, getForecastWeather, botMessage } = require("./helpers");

const bot = new TelegramBot(token, { polling: true });

// commander.parse(process.argv);
// const data = async () => {
//   return await getForecastWeather();
// };
// data();

console.log("hello");

const userIntervals = {};

bot.onText(/\/command1/, async (msg) => {
  const chatId = msg.chat.id;
  userIntervals[chatId] = 3;
  bot.sendMessage(chatId, "You will receive weather updates every 3 hours.");

  const { list } = await getForecastWeather();
  const { dt_txt, main, weather, clouds, wind, humidity, rain } = list[0];
  bot.sendMessage(
    chatId,
    botMessage(dt_txt, main, weather, clouds, wind, humidity, rain)
  );

  userIntervals[chatId + "_interval"] = setInterval(async () => {
    const { list } = await getForecastWeather();
    const { dt_txt, main, weather, clouds, wind, humidity, rain } = list[0];
    bot.sendMessage(
      chatId,
      botMessage(dt_txt, main, weather, clouds, wind, humidity, rain)
    );
  }, 1000 * 10800);
});

bot.onText(/\/command2/, async (msg) => {
  const chatId = msg.chat.id;
  userIntervals[chatId] = 6;
  bot.sendMessage(chatId, "You will receive weather updates every 6 hours.");

  const { list } = await getForecastWeather();
  const { dt_txt, main, weather, clouds, wind, humidity, rain } = list[0];
  bot.sendMessage(
    chatId,
    botMessage(dt_txt, main, weather, clouds, wind, humidity, rain)
  );

  userIntervals[chatId + "_interval"] = setInterval(async () => {
    const { list } = await getForecastWeather();
    const { dt_txt, main, weather, clouds, wind, humidity, rain } = list[0];
    bot.sendMessage(
      chatId,
      botMessage(dt_txt, main, weather, clouds, wind, humidity, rain)
    );
  }, 1000 * 21600);
});

// Stop the interval and clear the user's choice
bot.onText(/\/command3/, (msg) => {
  const chatId = msg.chat.id;
  if (userIntervals[chatId + "_interval"]) {
    clearInterval(userIntervals[chatId + "_interval"]);
    delete userIntervals[chatId + "_interval"];
    delete userIntervals[chatId];
    bot.sendMessage(chatId, "Weather updates have been stopped.");
  } else {
    bot.sendMessage(chatId, "You don't have any active updates to stop.");
  }
});

// commander
//   .command("m <message>")
//   .description("Sends a message to the Telegram bot")
//   .action((message) => {
//     bot.sendMessage(botChatId, message);
//     console.log("Message sent successfully.");
//     bot.stopPolling();
//   });

// commander
//   .command("p <photo-path>")
//   .description("Sends photo to Telegram bot")
//   .action((photoPath) => {
//     bot.sendPhoto(botChatId, photoPath);
//     console.log("Photo sent successfully.");
//     bot.stopPolling();
//   });
