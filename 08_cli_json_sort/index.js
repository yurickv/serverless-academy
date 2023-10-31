const axios = require("axios");

const endpoints = [
  "https://jsonbase.com/sls-team/json-793",
  "https://jsonbase.com/sls-team/json-955",
  "https://jsonbase.com/sls-team/json-231",
  "https://jsonbase.com/sls-team/json-931",
  "https://jsonbase.com/sls-team/json-93",
  "https://jsonbase.com/sls-team/json-342",
  "https://jsonbase.com/sls-team/json-770",
  "https://jsonbase.com/sls-team/json-491",
  "https://jsonbase.com/sls-team/json-281",
  "https://jsonbase.com/sls-team/json-718",
  "https://jsonbase.com/sls-team/json-310",
  "https://jsonbase.com/sls-team/json-806",
  "https://jsonbase.com/sls-team/json-469",
  "https://jsonbase.com/sls-team/json-258",
  "https://jsonbase.com/sls-team/json-516",
  "https://jsonbase.com/sls-team/json-79",
  "https://jsonbase.com/sls-team/json-706",
  "https://jsonbase.com/sls-team/json-521",
  "https://jsonbase.com/sls-team/json-350",
  "https://jsonbase.com/sls-team/json-64",
];

function findIsDoneValue(data, key) {
  if (typeof data === "object" && json !== null) {
    for (const property in data) {
      if (property === key) {
        return data[property];
      }

      const value = findIsDoneValue(data[property], key);
      if (value !== undefined) {
        return value;
      }
    }
  }

  return undefined;
}

let isTrue = 0;
let isFalse = 0;

async function queryEndpoint(endpoint, retries) {
  try {
    const response = await axios.get(endpoint);
    const result = findIsDoneValue(response.data, "isDone");
    if (result) {
      isTrue += 1;
    } else {
      isFalse += 1;
    }
    return console.log(`[Success] ${endpoint}: isDone-${result}`);
  } catch (error) {
    if (retries > 0) {
      return await queryEndpoint(endpoint, retries - 1);
    } else {
      console.error(
        `[Fail]  ${endpoint}: The endpoint is unavailable`,
        error.message
      );
      return undefined;
    }
  }
}

async function main() {
  await Promise.all(
    endpoints.map(async (endpoint) => {
      return await queryEndpoint(endpoint, 3);
    })
  );

  console.log("Found True values:", isTrue);
  console.log("Found False values:", isFalse);
}

main();
