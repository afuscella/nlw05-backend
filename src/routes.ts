import { Router } from 'express';
import { SettingController } from './controllers/SettingsController';

const routes = Router();
routes.post('/settings', (request, response) => {
  const controller = new SettingController();
  return controller.create(request, response);
});

export { routes };
