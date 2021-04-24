import { EntityRepository, Repository } from 'typeorm';
import { Connection } from '../models/entities/Connection';

@EntityRepository(Connection)
export class ConnectionsRepository extends Repository<Connection> { }
