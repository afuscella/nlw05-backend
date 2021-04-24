import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';
import { io } from '../config/HttpConfig';

interface IWebSocketParams {
  text: string;
  email: string
}

export const WebSocketClient = {
  async start(ioModule = io,
    usersServiceModule = new UsersService(),
    connectionsServiceModule = new ConnectionsService(),
    MessagesServiceModule = new MessagesService()) {
    ioModule.on('connect', (socket) => {
      socket.on('client_first_contact', async (params) => {
        const { text, email } = params as IWebSocketParams;
        const user = await usersServiceModule.handleCreate({ email });

        const user_id = user.id;
        const socket_id = socket.id;

        await connectionsServiceModule.handleCreate({
          socket_id,
          user_id,
        });

        await MessagesServiceModule.handleCreate({ text, user_id });
      });
    });
  },
};
