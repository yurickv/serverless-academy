const TelegramBot = require("node-telegram-bot-api");
// const commander = require("commander");
const { token, isMessageWeather, isMessageCurrency } = require("./helpers");

const bot = new TelegramBot(token, { polling: true });

console.log("hello");

const userIntervals = {};

bot.onText(/\/command2/, async (msg) => {
  const chatId = msg.chat.id;
  userIntervals[chatId] = 3;
  bot.sendMessage(chatId, "Ви підписались на оновлення погоди кожні 3 год.");

  await isMessageWeather(chatId, bot);

  userIntervals[chatId + "_interval"] = setInterval(async () => {
    await isMessageWeather(chatId, bot);
  }, 1000 * 10800);
});

bot.onText(/\/command3/, async (msg) => {
  const chatId = msg.chat.id;
  userIntervals[chatId] = 6;
  bot.sendMessage(chatId, "Ви підписались на оновлення погоди кожні 6 год.");

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
    bot.sendMessage(chatId, "Підписка на прогноз погоди скасовано.");
  } else {
    bot.sendMessage(chatId, "Ви не мали активних підписок.");
  }
});
// start buttons
const startMenuButtons = {
  reply_markup: {
    keyboard: [["Погода в Тернополі"], ["Курс валют"]],
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
});

// Exchange buttons
bot.on("message", async (msg) => {
  if (msg.text.indexOf("Курс валют") === 0) {
    bot.sendMessage(msg.chat.id, "Виберіть потрібну валюту", {
      reply_markup: {
        keyboard: [["USD", "EUR"], ["Попереднє меню"]],
      },
    });
  }
  if (msg.text === "USD" || msg.text === "EUR") {
    isMessageCurrency(msg.chat.id, bot, msg.text);
  }
  if (msg.text.indexOf("Попереднє меню") === 0) {
    bot.sendMessage(
      msg.chat.id,
      "Повертаємось до попереднього меню",
      startMenuButtons
    );
  }
});

// command1 - Початок роботи
// command2 - Погода в Тернополі - кожні 3 години
// command3 - Погода в Тернополі - кожні 6 години
// command4 - Зупинити підписку на оновлення погоди
