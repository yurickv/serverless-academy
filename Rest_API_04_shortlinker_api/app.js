import express from "express";
import { nanoid } from "nanoid";

const app = express();
const port = process.env.PORT || 3000;

const urlStore = {};

app.use(express.json());

app.post("/shortip", (req, res) => {
  const originalUrl = req.body.url;

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortId = nanoid(6);
  const shortUrl = `http://localhost:${port}/${shortId}`;

  urlStore[shortId] = originalUrl;
  console.log(urlStore);
  res.json({ shortUrl });
});

app.get("/:shortId", (req, res) => {
  const shortId = req.params.shortId;
  const originalUrl = urlStore[shortId];

  if (!originalUrl) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(originalUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function isValidUrl(url) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}
