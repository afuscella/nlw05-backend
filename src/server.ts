/* eslint-disable no-console */
import 'reflect-metadata';
import { db } from './infra/db';
import { Middleware } from './infra/middleware';
import { routes } from './routes';

db.config()
  .then(async () => {
    const port = 3333;
    const middleware = await Middleware.config();

    middleware.use(routes);
    middleware.listen(port, () => console.log(`server is running on ${port}`));
  })
  .catch((err) => console.log(err.message));
