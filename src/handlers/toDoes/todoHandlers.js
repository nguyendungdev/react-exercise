import {
    getAll as getAllToDos,
    add as addToDo,
    deleteById as deleteOneToDo,
    getById,
    updateById,
    pickField,
    updateStatus,
} from "../../database/todoRepository";

export async function getToDos(ctx) {
    try {
        const query = ctx.query;
        const toDoList = getAllToDos(query);
        ctx.status = 200;
        return ctx.body = toDoList;
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

export async function getToDo(ctx) {
    try {
        const { id } = ctx.params;
        const { fields } = ctx.query;
        let toDo = getById(id);
        if (!toDo) {
            throw new Error('No to do Found with the given id!')
        }
        if (fields) {
            const listFields = fields.split(',');
            toDo = pickField(listFields, toDo);
        }
        ctx.status = 200;
        return ctx.body = {
            data: toDo
        }

    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message,
        }
    }
}

export async function deleteToDo(ctx) {
    try {
        const { id } = ctx.params;
        const toDo = getById(id);
        if (toDo) {
            deleteOneToDo(id);
            ctx.status = 201;
            return ctx.body = {
                success: true
            };
        }
        throw new Error(`toDo with id : ${id} doesn't exists!`)
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            data: [],
            error: e.message,
        };
    }
}

export async function save(ctx) {
    try {
        const postData = ctx.request.body;
        const newTodo = addToDo({ ...postData, createAt: new Date() });
        ctx.status = 201;
        return ctx.body = {
            success: true,
            data: newTodo
        }

    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message,
        }

    }
}

export async function updatedStatus(ctx) {
    try {
        const { id } = ctx.params;
        const toDo = getById(id);
        if (!toDo) {
            throw new Error(`ToDo with id : ${id} doesn't exists!`);
        }
        updateStatus(id);
        ctx.status = 200;
        return ctx.body = {
            success: true
        }
    }
    catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message,
        }
    }
}

export async function updateToDo(ctx) {
    try {
        const { id } = ctx.params;
        const updateData = ctx.request.body;
        const toDo = getById(id);
        if (!toDo) {
            throw new Error(`ToDo with id : ${id} doesn't exists!`);
        }
        updateById(id, { ...updateData });
        ctx.status = 201;
        return ctx.body = {
            success: true
        }
    }
    catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message,
        }
    }
}
