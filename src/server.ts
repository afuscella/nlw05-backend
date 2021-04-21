/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import { routes } from './routes';
import { Database } from './database';

Database.setup()
  .then(() => {
    const port = 3333;
    const app = express();

    app.use(express.json());
    app.use(routes);

    app.listen(port, () => console.log(`server is running on ${port}`));
  })
  .catch(() => console.log());
