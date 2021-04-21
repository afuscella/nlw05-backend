import { Router } from 'express';
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const routes = Router();

routes.post('/users', (request, response) => {
  const controller = new UsersController();
  return controller.create(request, response);
});

routes.post('/settings', (request, response) => {
  const controller = new SettingsController();
  return controller.create(request, response);
});

routes.get('/messages/:id', (request, response) => {
  const controller = new MessagesController();
  return controller.index(request, response);
});

routes.post('/messages', (request, response) => {
  const controller = new MessagesController();
  return controller.create(request, response);
});

export { routes };
