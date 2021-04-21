import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

export class SettingsController {
  // @injection
  constructor(private settingService = new SettingsService()) { }

  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    try {
      const settings = await this.settingService.handleCreate({ chat, username });
      return response.status(201).json(settings);
    } catch (err) {
      return response.status(202).json({ message: err.message })
    }
  }
}
