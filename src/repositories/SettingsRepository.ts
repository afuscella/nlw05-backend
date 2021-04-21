import { EntityRepository, Repository } from 'typeorm';
import { Setting } from '../models/entities/Setting';

@EntityRepository(Setting)
export class SettingsRepository extends Repository<Setting> { }
