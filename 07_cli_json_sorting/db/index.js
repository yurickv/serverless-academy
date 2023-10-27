const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "data.json");
const newFilePath = path.join(__dirname, "newData.json");

const listEmployee = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
};

const writeNewListEmployee = async (arrey) => {
  await fs.writeFile(newFilePath, JSON.stringify(arrey));
  return console.log(
    "Відформатовані дані записано успішно у файл newData.json"
  );
};

module.exports = { listEmployee, writeNewListEmployee };
