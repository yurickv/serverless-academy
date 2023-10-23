import { input, select, confirm } from "@inquirer/prompts";
import fs from "fs/promises";
const path = "users.txt";

const listUser = async () => {
  const data = await fs.readFile(path, "utf-8");
  return JSON.parse(data);
};
const addUser = async (data) => {
  const list = await listUser();

  list.push(data);
  await fs.writeFile(path, JSON.stringify(list, null, 2));
  return;
};
const getUserByName = async (name) => {
  const list = await listUser();
  const result = list.find((item) => item.firstName.toLowerCase() === name);

  return result || null;
};

const contact = async () => {
  const firstNameAnswer = await input({
    message: "Enter the user's name? To cancel press ENTER",
  });
  if (firstNameAnswer === "") {
    searchInDB();
    return;
  }
  const ageUser = await input({
    message: "Enter user age",
  });
  const answers = {
    firstName: firstNameAnswer.trim(),
    gender: await select({
      message: "Select user gender",
      choices: [
        {
          name: "male",
          value: "male",
        },
        {
          name: "female",
          value: "female",
        },
      ],
    }),
    age: ageUser.trim(),
  };

  addUser(answers);
  contact();
};
contact();

async function searchInDB() {
  const answer = await confirm({
    message: "Would you search user in Data Base?",
  });
  if (answer) {
    findingUserByName();
  } else {
    console.log("Good bye, see you later");
  }
}

async function findingUserByName() {
  const list = await listUser();
  console.table(list);
  const findUserForName = await input({
    message: "Enter the user's name to find the user by name",
  });
  const findedUser = await getUserByName(findUserForName.toLowerCase());

  if (findedUser) {
    console.log(findedUser);
  } else {
    console.log(`User ${findUserForName} does not exist.`);

    const answer = await confirm({
      message: "Would you search another user?",
    }); // запитуємо чи ще шукати іншого юзера?

    if (answer) {
      findingUserByName();
      console.log("Good bye, see you later");
    } else {
      console.log("Good bye, see you later");
    }
  }
}
