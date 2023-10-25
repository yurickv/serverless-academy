const formattedDate = (dt_txt) =>
  new Date(dt_txt).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const botMessage = (
  dt_txt,
  main,
  weather,
  clouds,
  wind
) => `🌦 Weather Forecast 🌦
Date & Time: ${formattedDate(dt_txt)}
Temperature: ${main.temp}°C
Feels Like: ${main.feels_like}°C
Weather: ${weather[0].description}
Cloud Coverage: ${clouds.all}%
Wind Speed: ${wind.speed} m/s
`;
module.exports = { botMessage };
