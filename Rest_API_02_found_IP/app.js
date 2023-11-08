const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const requestIp = require("request-ip");
const findCountryByIP = require("./helpers/functions");

const contactsPath = require("./db");

const app = express();
const port = process.env.PORT || 3000;

const ipRanges = [];

fs.createReadStream(contactsPath)
  .pipe(csv())
  .on("data", (data) => ipRanges.push(data))
  .on("end", () => {
    console.log("IP ranges loaded");
  });

app.get("/location", (req, res) => {
  const userIP = requestIp.getClientIp(req);

  const userCountry = findCountryByIP(userIP, ipRanges);
  console.log(userCountry);

  if (!userCountry) {
    return res.status(404).send({ message: "User location not found" });
  }

  res.status(200).send({
    ipAddress: userIP,
    country: userCountry.country,
    countryFullName: userCountry.countryName,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
