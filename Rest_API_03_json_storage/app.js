const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// middleware робить перевірку чи валідне тіло запиту
app.use((req, res, next) => {
  if (req.method === "PUT") {
    try {
      req.body = JSON.parse(req.rawBody);
    } catch (error) {
      return res.status(400).send({ message: "Invalid JSON data" });
    }
  }
  next();
});

app.put("/:jsonPath", (req, res) => {
  const jsonPath = req.params.jsonPath;
  const jsonData = req.body;

  // Запис json-даних у файл
  const fileName = `./db/${jsonPath}.json`;
  fs.writeFileSync(fileName, JSON.stringify(jsonData));

  res.status(201).send({ message: "JSON data stored successfully" });
});

app.get("/:jsonPath", (req, res) => {
  const jsonPath = req.params.jsonPath;
  const fileName = `./db/${jsonPath}.json`;

  if (!fs.existsSync(fileName)) {
    return res.status(404).send({ message: "JSON data not found" });
  }

  const jsonData = fs.readFileSync(fileName, "utf-8");
  res.status(200).send(JSON.parse(jsonData));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
