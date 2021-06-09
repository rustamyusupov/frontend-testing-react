import { rest } from 'msw';
import { uniqueId } from 'lodash/fp';

let tasks = [];

const handlers = [
  rest.get('/tasks', (_, res, ctx) => res(ctx.json(tasks))),
  rest.post('/tasks', (req, res, ctx) => {
    const id = uniqueId();
    const task = { ...req.body.task, id, state: 'active' };

    tasks = [...tasks, task];

    return res(ctx.json(task));
  }),
  rest.delete('/tasks/:id', (req, res, ctx) => {
    const { id } = req.params;
    tasks = tasks.filter((t) => t.id !== id);

    return res(ctx.status(204));
  }),
];

export default handlers;
