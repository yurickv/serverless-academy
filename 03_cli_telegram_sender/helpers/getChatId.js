const TelegramBot = require("node-telegram-bot-api");
const { token } = require(".");

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (message) => {
  console.log(`Chat ID: ${message.chat.id}`);
  process.exit();
});

console.log("Waiting for message to capture chatBot ID...");

// щоб взнати ІD (це не назва чату) свого чату , запустити цей файл
