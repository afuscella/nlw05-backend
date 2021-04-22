import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

export class SettingsController {
  private settingService: SettingsService

  // @injection
  constructor(settingService = new SettingsService()) {
    this.settingService = settingService;
  }

  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    try {
      const settings = await this.settingService.handleCreate({ chat, username });
      return response.status(201).json(settings);
    } catch (err) {
      return response.status(202).json({ message: err.message });
    }
  }
}
