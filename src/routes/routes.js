import Router from 'koa-router';
import * as todoHandler from '../handlers/toDoes/todoHandlers'
import todoInputMiddleware from '../middleware/toDoInputMiddleware';

const router = new Router({
  prefix: '/api'
});

router.get('/todo', todoHandler.getToDos)
  .post('/todo', todoInputMiddleware, todoHandler.save)
  .delete('/todo/:id', todoHandler.deleteToDo)
  .put('/todo/:id', todoInputMiddleware, todoHandler.updateToDo)
  .patch('/todo/:id', todoHandler.updatedStatus);
export default router;
