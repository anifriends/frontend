import { http } from 'msw';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/todos/1', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      }),
    );
  }),
];
