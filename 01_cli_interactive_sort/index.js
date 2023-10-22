const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // введення зі стандартного потоку
  output: process.stdout, // виведення у стандартний потік
});

function numberOfTasks() {
  //виведення таблиці запитань
  console.table({
    1: "Sort words alphabetically",
    2: "Show numbers from lesser to greater",
    3: "Show numbers from bigger to smaller",
    4: "Display words in ascending order by number of letters in the word",
    5: "Show only unique words",
    6: "Display only unique values from the set of words and numbers entered by the user",
  });
  console.log(`To exit the program, the you need to enter exit`);
}
const isValid = (value) => {
  //перевірка на пусту строку або не валідний номер команди
  if (isNaN(value)) {
    console.log("Enter a number!");
    return false;
  }
  if (value < 1 || value > 6) {
    console.log("The number must be between 1 and 6");
    return false;
  }
  return true;
};

let arrey = [];

const gameQuestionOne = () => {
  rl.question(
    "Enter a few words or numbers separated by a space:",
    (answer) => {
      if (!answer) {
        console.log(`You have not entered anything`);
        gameQuestionOne();
        return;
      }
      if (answer === "exit") {
        console.log("Good bye, see you late");
        rl.close();
        return;
      }
      arrey = answer.split(" ");

      numberOfTasks();
      gameQuestionTwo();
    }
  );
};
gameQuestionOne();

const gameQuestionTwo = () => {
  rl.question(
    `What operation to do with words and numbers (enter number operation)?`,
    (answerNumb) => {
      if (!isValid(answerNumb)) {
        gameQuestionTwo();
        return;
      }

      resultConsole(Number(answerNumb));

      gameQuestionOne();
    }
  );
};

// функції сортування
const inAlphabetOrder = (data) => [...data].sort((a, b) => a.localeCompare(b));
const inNumberGrowth = (data) => [...data].sort((a, b) => a - b);
const inNumberDescending = (data) => [...data].sort((a, b) => b - a);
const inLengthWord = (data) =>
  [...data].sort((a, b) => a.split("").length - b.split("").length);
const inUniqueValue = (data) =>
  [...data]
    .map((value) => value)
    .filter((name, index, array) => array.indexOf(name) === index);

const onOnlyWord = (data) => {
  //повертає масив лише рядків
  let result = [];
  data.map((unit) => {
    if (!Number(unit)) {
      result.push(unit);
    }
  });
  return result;
};
const onOnlyNumber = (data) => {
  //повертає масив лише number
  let result = [];
  data.map((unit) => {
    if (Number(unit)) {
      result.push(unit);
    }
  });
  return result;
};

// фінальна функція виведення результату відносно номера введеної команди
function resultConsole(number) {
  switch (number) {
    case 1:
      console.log(inAlphabetOrder(onOnlyWord(arrey)));
      break;
    case 2:
      console.log(inNumberGrowth(onOnlyNumber(arrey)));
      break;
    case 3:
      console.log(inNumberDescending(onOnlyNumber(arrey)));
      break;
    case 4:
      console.log(inLengthWord(onOnlyWord(arrey)));
      break;
    case 5:
      console.log(inUniqueValue(onOnlyWord(arrey)));
      break;

    case 6:
      console.log(
        inUniqueValue(onOnlyWord(arrey)).concat(
          inUniqueValue(onOnlyNumber(arrey))
        )
      );
      break;
  }
}
