const TelegramBot = require("node-telegram-bot-api");
const commander = require("commander");
const { token, botChatId } = require("./helpers");

const bot = new TelegramBot(token, { polling: true });

commander
  .command("m <message>")
  .description("Sends a message to the Telegram bot")
  .action((message) => {
    bot.sendMessage(botChatId, message);
    console.log("Message sent successfully.");
    bot.stopPolling();
  });

commander
  .command("p <photo-path>")
  .description("Sends photo to Telegram bot")
  .action((photoPath) => {
    bot.sendPhoto(botChatId, photoPath);
    console.log("Photo sent successfully.");
    bot.stopPolling();
  });

commander.parse(process.argv);
