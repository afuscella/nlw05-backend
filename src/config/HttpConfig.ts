import { HttpServer } from '../infra/http/HttpServer';
import { WebSocket } from '../infra/socket/WebSocket';
import { routes } from '../routes';

const http = HttpServer.config({
  cwd: '../../../public',
  routes,
});
const io = WebSocket.config(http);

export { http, io };
