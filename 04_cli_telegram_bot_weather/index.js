const TelegramBot = require("node-telegram-bot-api");
// const commander = require("commander");
const { token, isMessageWeather } = require("./helpers");

const bot = new TelegramBot(token, { polling: true });

console.log("hello");

const userIntervals = {};

bot.onText(/\/command1/, async (msg) => {
  const chatId = msg.chat.id;
  userIntervals[chatId] = 3;
  bot.sendMessage(chatId, "You will receive weather updates every 3 hours.");

  await isMessageWeather(chatId, bot);

  userIntervals[chatId + "_interval"] = setInterval(async () => {
    await isMessageWeather(chatId, bot);
  }, 1000 * 10800);
});

bot.onText(/\/command2/, async (msg) => {
  const chatId = msg.chat.id;
  userIntervals[chatId] = 6;
  bot.sendMessage(chatId, "You will receive weather updates every 6 hours.");

  await isMessageWeather(chatId, bot);

  userIntervals[chatId + "_interval"] = setInterval(async () => {
    await isMessageWeather(chatId, bot);
  }, 1000 * 21600);
});

// Stop interval and clear user's choice
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
