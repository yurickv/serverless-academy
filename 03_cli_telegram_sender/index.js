const commander = require("commander");
const TelegramBot = require("node-telegram-bot-api");

const program = new commander.Command();

// const TELEGRAM_BOT_TOKEN = "6399801624:AAHi7swbSAx9O6QKXGwUqFp_rOBC0TtA9mI";
// const token = TELEGRAM_BOT_TOKEN;

program.option("-t, --token <token>", "Telegram bot token");

program.parse(process.argv);

const token = program.opts.token || process.env.TELEGRAM_BOT_TOKEN;

console.log(token);
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Hello!");
});
