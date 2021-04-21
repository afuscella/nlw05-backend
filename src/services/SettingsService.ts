import { getRepository, SettingsRepositories } from '../repositories/SettingsRepositories';
import { Setting } from '../models/entities/Settings';

export interface ISettingsService {
  handleCreate: (chat: boolean, username: string) => Promise<Setting>;
}

export class SettingsService implements ISettingsService {

  // @injection
  constructor(private settingsRepositories = SettingsRepositories, private repository = getRepository) { }

  public async handleCreate(chat: boolean, username: string) {
    const settingsRepository = this.repository(this.settingsRepositories);
    const settings = settingsRepository.create({
      chat,
      username
    });

    await settingsRepository.save(settings);
    return settings;
  }
}
