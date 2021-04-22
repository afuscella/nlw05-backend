import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { Setting } from '../models/entities/Setting';

interface ICreate {
  chat: boolean;
  username: string;
}

export interface ISettingsService {
  handleCreate: ({ chat, username }: ICreate) => Promise<Setting>;
}

export class SettingsService implements ISettingsService {
  private settingsRepository: SettingsRepository;

  // @injection
  constructor(settingsRepository = getCustomRepository(SettingsRepository)) {
    this.settingsRepository = settingsRepository;
  }

  async handleCreate({ chat, username }: ICreate) {
    const isUserAlreadyExist = await this.settingsRepository.findOne({ username });

    if (isUserAlreadyExist) {
      throw new Error('User already exists');
    }
    const setting = this.settingsRepository.create({ chat, username });
    await this.settingsRepository.save(setting);

    return setting;
  }
}
