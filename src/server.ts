/* eslint-disable no-console */
import 'reflect-metadata';
import { WebSocketClient } from './websocket/client';
import { db } from './infra/db/Database';
import { http } from './config/HttpConfig';

const PORT = 3333;

db.config()
  .then(() => {
    WebSocketClient.start();
    http.listen(PORT, () => console.log(`server is running on ${PORT}`));
  })
  .catch((err) => console.log(err.message));
