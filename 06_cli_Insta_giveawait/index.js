const fs = require("fs").promises;
const path = require("path");

const folderPath = path.join(__dirname, "db");

async function countUniqueValues() {
  const files = await fs.readdir(folderPath);
  const uniqueUsers = new Set();

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.trim().split("\n");

    for (const line of lines) {
      uniqueUsers.add(line);
    }
  }
  console.log("Загальна кількість унікальних імен:", uniqueUsers.size);
  // return uniqueUsers.size;
}

async function countUsersInAtLeastNFiles(numberFiles) {
  const files = await fs.readdir(folderPath);
  const userCounts = new Map();

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.trim().split("\n");

    for (const line of lines) {
      const userName = line;

      if (userCounts.has(userName)) {
        userCounts.set(userName, userCounts.get(userName) + 1);
      } else {
        userCounts.set(userName, 1);
      }
    }
  }

  let usersInAtLeastNFiles = 0;
  for (const [userName, count] of userCounts.entries()) {
    if (count >= numberFiles) {
      usersInAtLeastNFiles += 1;
    }
  }
  console.log(
    `Загальна кількість імен, що зустрічаються щонайменше в ${numberFiles} файлах:`,
    usersInAtLeastNFiles
  );
  // return usersInAtLeast10Files;
}

const main = async () => {
  console.time("countUniqueValues");
  await countUniqueValues();
  console.timeEnd("countUniqueValues");

  console.time("countUsersInAtLeastNFiles");
  await countUsersInAtLeastNFiles(1);
  console.timeEnd("countUsersInAtLeastNFiles");

  console.time("countUsersInAtLeastNFiles");
  await countUsersInAtLeastNFiles(10);
  console.timeEnd("countUsersInAtLeastNFiles");

  console.time("countUsersInAtLeastNFiles");
  await countUsersInAtLeastNFiles(20);
  console.timeEnd("countUsersInAtLeastNFiles");
};

main();
