import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { Setting } from '../models/entities/Setting';

interface IParams {
  chat: boolean;
  username: string;
}

interface ISearch {
  username: string;
}

export interface ISettingsService {
  handleCreate: ({ chat, username }: IParams) => Promise<Setting>;
  handleUpdate: ({ chat, username }: IParams) => Promise<void>;
  findByUsername: ({ username }: ISearch) => Promise<Setting>;
}

export class SettingsService implements ISettingsService {
  private settingsRepository: SettingsRepository;

  // @injection
  constructor(settingsRepository = getCustomRepository(SettingsRepository)) {
    this.settingsRepository = settingsRepository;
  }

  async handleCreate({ chat, username }: IParams) {
    const isUserAlreadyExist = await this.settingsRepository.findOne({ username });

    if (isUserAlreadyExist) {
      throw new Error('User already exists');
    }
    const setting = this.settingsRepository.create({ chat, username });
    await this.settingsRepository.save(setting);

    return setting;
  }

  async handleUpdate({ username, chat }: IParams) {
    await this.settingsRepository.createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', {
        username,
      })
      .execute();
  }

  async findByUsername({ username }) {
    const settings = await this.settingsRepository.findOne({ username });
    return settings;
  }
}
