/* eslint-disable no-console */
import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

export const WebSocket = {
  async config(HttpServerModule = new HttpServer()) {
    const io = new Server(HttpServerModule);

    io.on('connection', (socket: Socket) => {
      console.log('connected', socket.id);
    });
  },
};
