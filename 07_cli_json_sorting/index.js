const fs = require("fs").promises;
const { listEmployee, writeNewListEmployee } = require("./db");

async function newFormatedJson() {
  let data = await listEmployee();

  // console.log(data);
  const transformedArray = data.reduce((result, item) => {
    const existingItem = result.find(
      (element) => element.userId === item.user._id
    );

    if (existingItem) {
      existingItem.vacations.push({
        startDate: item.startDate,
        endDate: item.endDate,
      });
    } else {
      result.push({
        userId: item.user._id,
        userName: item.user.name,
        vacations: [
          {
            startDate: item.startDate,
            endDate: item.endDate,
          },
        ],
      });
    }

    return result;
  }, []);
  // console.log(transformedArray);
  await writeNewListEmployee(transformedArray);
}
newFormatedJson();
