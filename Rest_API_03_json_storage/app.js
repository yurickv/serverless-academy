const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse JSON in the request body
app.use(express.json());

app.put("/:jsonPath", (req, res) => {
  const jsonPath = req.params.jsonPath;
  const jsonData = req.body;
  console.log(jsonData);

  if (!jsonData) {
    return res.status(400).json({ error: "Invalid JSON document" });
  }
  // Запис json-даних у файл
  const fileName = `./db/${jsonPath}.json`;
  fs.writeFileSync(fileName, JSON.stringify(jsonData));

  res.status(201).send({ message: "JSON data stored successfully" });
});

app.get("/:jsonPath", (req, res) => {
  const jsonPath = req.params.jsonPath;
  const fileName = `./db/${jsonPath}.json`;

  if (!fs.existsSync(fileName)) {
    console.log("JSON file not found");
    return res.status(404).send({ message: "JSON file not found" });
  }

  const jsonData = fs.readFileSync(fileName, "utf-8");
  console.log(JSON.parse(jsonData));
  res.status(200).send(JSON.parse(jsonData));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
