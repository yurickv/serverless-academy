const fs = require("fs").promises;

const path = require("path");
const folderPath = path.join(__dirname, "db");

let files = [];
const readingDataBase = async () => {
  try {
    files = await fs.readdir(folderPath);
    // console.log(files);
  } catch (error) {
    console.error("Error:", error);
  }
};
readingDataBase();

// console.log(folderPath);

const uniqueValues = async () => {
  try {
    let uniqueNames = [];

    for (const file of files) {
      console.log(file);
      const filePath = path.join(folderPath, file);
      const data = await fs.readFile(filePath, "utf8");
      const lines = data.trim().split("\n");

      lines.forEach((line) => {
        if (!uniqueNames.includes(line)) {
          uniqueNames.push(line);
        }
      });
    }

    const uniqueNameCount = uniqueNames.length;
    console.log("Total unique names:", uniqueNameCount);
  } catch (error) {
    console.error("Error:", error);
  }
};
uniqueValues();
