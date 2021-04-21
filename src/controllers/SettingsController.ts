import { Request, Response } from 'express';
import { ISettingsService, SettingsService } from '../services/SettingsService';

export class SettingController {

  // @injection
  constructor(private settingService: ISettingsService = new SettingsService()) { }

  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settings = await this.settingService.handleCreate(chat, username);
    return response.json(settings);
  }
}
