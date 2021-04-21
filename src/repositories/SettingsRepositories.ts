import { getCustomRepository, EntityRepository, Repository } from 'typeorm';
import { Setting } from '../models/entities/Settings';

export { getCustomRepository as getRepository };

@EntityRepository(Setting)
export class SettingsRepositories extends Repository<Setting> { };
