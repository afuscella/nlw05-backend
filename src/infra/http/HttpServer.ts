import { createServer } from 'http';
import { Middleware } from '../middleware/Middleware';

export const HttpServer = {
  config({ cwd, routes }, MiddlewareModule = Middleware, createServerModule = createServer) {
    const middleware = MiddlewareModule.config({
      cwd,
      routes,
    });
    middleware.get('/pages/client', (request, response) => response.render('html/client.html'));

    return createServerModule(middleware);
  },
};
