const faker = require('faker');
const fs = require('fs');

let count = 1;
const generateTodo = () => {
    return {
        id: count++,
        name: `To do ${count}`,
        isCompleted: faker.datatype.boolean(),
        createdAt: faker.date.past().toISOString(),
    };
};

const generateToDoes = (count) => {
    const toDoList = [];
    for (let i = 0; i < count; i++) {
        toDoList.push(generateTodo());
    }
    return toDoList;
};

const toDoList = generateToDoes(1000);

const jsonContent = JSON.stringify(toDoList, null, 2);

fs.writeFileSync('src/database/todo.json', jsonContent);

