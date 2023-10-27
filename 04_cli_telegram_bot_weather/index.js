const TelegramBot = require("node-telegram-bot-api");
// const commander = require("commander");
const { token, isMessageWeather } = require("./helpers");

const bot = new TelegramBot(token, { polling: true });

console.log("hello");

const userIntervals = {};

bot.onText(/\/command2/, async (msg) => {
  const chatId = msg.chat.id;
  userIntervals[chatId] = 3;
  bot.sendMessage(chatId, "You will receive weather updates every 3 hours.");

  await isMessageWeather(chatId, bot);

  userIntervals[chatId + "_interval"] = setInterval(async () => {
    await isMessageWeather(chatId, bot);
  }, 1000 * 10800);
});

bot.onText(/\/command3/, async (msg) => {
  const chatId = msg.chat.id;
  userIntervals[chatId] = 6;
  bot.sendMessage(chatId, "You will receive weather updates every 6 hours.");

  await isMessageWeather(chatId, bot);

  userIntervals[chatId + "_interval"] = setInterval(async () => {
    await isMessageWeather(chatId, bot);
  }, 1000 * 21600);
});

// Stop interval and clear user's choice
bot.onText(/\/command4/, (msg) => {
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

// start buttons
const startMenuButtons = {
  reply_markup: {
    keyboard: [["Погода в Тернополі"]],
  },
};

bot.onText(/\/command1/, async (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Вітання, взнати зараз курс валют чи прогноз погоди?",
    startMenuButtons
  );
});
// Forecast buttons
bot.on("message", async (msg) => {
  if (msg.text.indexOf("Погода в Тернополі") === 0) {
    bot.sendMessage(msg.chat.id, "Виберіть інтервал підписки", {
      reply_markup: {
        keyboard: [
          ["Кожні 3 години", "Кожні 6 годин"],
          ["Зупинити підписку"],
          ["Попереднє меню"],
        ],
      },
    });
  }

  if (msg.text.toString().toLowerCase().includes("3")) {
    const chatId = msg.chat.id;
    userIntervals[chatId] = 3;
    bot.sendMessage(
      chatId,
      "Ви підписались на оновлення погоди кожні 3 години"
    );

    await isMessageWeather(chatId, bot);

    userIntervals[chatId + "_interval"] = setInterval(async () => {
      await isMessageWeather(chatId, bot);
    }, 1000 * 10800);
  }

  if (msg.text.toString().toLowerCase().includes("6")) {
    const chatId = msg.chat.id;
    userIntervals[chatId] = 6;
    bot.sendMessage(chatId, "Ви підписались на оновлення погоди кожні 6 годин");

    await isMessageWeather(chatId, bot);

    userIntervals[chatId + "_interval"] = setInterval(async () => {
      await isMessageWeather(chatId, bot);
    }, 1000 * 21600);
  }

  if (msg.text.indexOf("Зупинити підписку") === 0) {
    const chatId = msg.chat.id;
    if (userIntervals[chatId + "_interval"]) {
      clearInterval(userIntervals[chatId + "_interval"]);
      delete userIntervals[chatId + "_interval"];
      delete userIntervals[chatId];
      bot.sendMessage(chatId, "Ви відписались від прогнозу погоди");
    } else {
      bot.sendMessage(chatId, "Ви не мали жодних активних підписок");
    }
  }
  if (msg.text.indexOf("Попереднє меню") === 0) {
    bot.sendMessage(
      msg.chat.id,
      "Повертаємось до попереднього меню",
      startMenuButtons
    );
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
