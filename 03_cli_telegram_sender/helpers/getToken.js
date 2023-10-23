const fs = require("fs");
const commander = require("commander");

// Викор. commander, щоб передати шлях до .env файлу як аргумент командного рядка
commander
  .option("-e, --env <path>", "Шлях до .env файлу")
  .option("-m, --message <message>", "type your message to Telegram bot")
  .option(
    "-p, --photo <photo-path>",
    "to send photo Telegram bot, write pathPhoto"
  )
  .parse(process.argv);

// Шлях до .env файлу з аргументів командного рядка або берем за замовчуванням
const envFilePath = commander.env || ".env";

const envFileContent = fs.readFileSync(envFilePath, "utf8");

// Розбивання вмісту файлу на рядки та встановлення змінних оточення
const envLines = envFileContent.split("\n");
envLines.forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    process.env[key.trim()] = value.trim();
  }
});

const token = process.env.TELEGRAM_BOT_TOKEN;

const botChatId = process.env.BOT_CHAT_ID;

module.exports = { token, botChatId };
