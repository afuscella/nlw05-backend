import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

export class SettingsController {
  private settingService: SettingsService

  // @injection
  constructor(settingService = new SettingsService()) {
    this.settingService = settingService;
  }

  async create(request: Request, response: Response) {
    const { username, chat } = request.body;

    try {
      const settings = await this.settingService.handleCreate({ chat, username });
      return response.status(201).json(settings);
    } catch (err) {
      return response.status(202).json({ message: err.message });
    }
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;
    await this.settingService.handleUpdate({ chat, username });
    return response.status(202).json();
  }

  async index(request: Request, response: Response) {
    const { username } = request.params;
    const settings = await this.settingService.findByUsername({ username });
    if (settings) {
      return response.status(200).json(settings);
    }
    return response.status(404).json({});
  }
}
