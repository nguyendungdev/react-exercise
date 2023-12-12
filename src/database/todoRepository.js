const fs = require('fs');
const toDoList = require('./toDo.json');

/**
 * 
 * @param {[{id:number,name:string,price:number,description:string,toDo:string,color:string,createAt:Date,image:string}]} newtoDoList 
 */
function saveData(newtoDoList) {
    return fs.writeFileSync('./src/database/todo.json', JSON.stringify(newtoDoList), null, 4);
}

/**
 * 
 * @param {number}limit 
 * @param {string} sort desc or asc
 * @returns {[{id:number,name:string,price:number,description:string,toDo:string,color:string,createAt:Date,image:string}]}
 */
function getAll(query) {
    let result = [...toDoList]
    if (query.sort) {

        result.sort((a, b) => {
            const sortCondition = query.sort.toLowerCase() === 'desc' ? 'desc' : 'asc';
            const orderBy = sortCondition === 'desc' ? -1 : 1;
            return orderBy * (new Date(a.createdAt) - new Date(b.createdAt));
        })
    }
    if (query.limit) {
        result = result.slice(0, parseInt(query.limit))
    }
    return result;
}

/**
 * 
 * @param {number} id 
 * @returns {[{id:number,name:string,price:number,description:string,toDo:string,color:string,createAt:Date,image:string}]}
 */
function getById(id) {
    return toDoList.find(toDo => toDo.id === parseInt(id));
}


/**
 * 
 * @param {{name:string,price:number,description:string,toDo:string,color:string,createAt:Date,image:string}} data 
 * @returns  {[{id:number,name:string,price:number,description:string,toDo:string,color:string,createAt:Date,image:string}]}
 */

function add(data) {
    let id = 1
    if (toDoList.length - 1 !== -1) {
        id = (toDoList[toDoList.length - 1].id) + 1
    }
    const newTodo = { ...data, id, isCompleted: false }
    const updateTodo = [...toDoList, newTodo];
    saveData(updateTodo);
    return newTodo
}

/**
 * 
 * @param {number} id 
 */
function deleteById(id) {
    const deletedtoDoList = toDoList.filter((toDo) =>
        toDo.id !== parseInt(id)
    );
    return saveData(deletedtoDoList);

}

/**
 * 
 * @param {number} index 
 * @param {{name:string,price:number,description:string,toDo:string,color:string,createAt:Date,image:string}} data 
 */
function updateById(id, data) {
    const newtoDoList = toDoList.map((todo) => {
        return todo.id === parseInt(id) ? data : todo
    });

    return saveData(newtoDoList);
}



function updateStatus(id) {
    const newtoDoList = toDoList.map((todo) => {
        console.log(todo)
        return todo.id === parseInt(id) ? { ...todo, isCompleted: !todo.isCompleted } : todo
    });
    return saveData(newtoDoList);
}

/**
 * 
 * @param {string[]} fields 
 * @param {[{id:number,name:string,price:number,description:string,toDo:string,color:string,createAt:Date,image:string}]} toDo 
 * @returns {{}}
 */
function pickField(fields, toDo) {
    return fields.reduce((picked, field) => {
        if (toDo.hasOwnProperty(field)) {
            picked[field] = toDo[field];
        }
        return picked;
    }, {});
}


module.exports = {
    pickField,
    getAll,
    add,
    deleteById,
    getById,
    updateById,
    updateStatus
}
