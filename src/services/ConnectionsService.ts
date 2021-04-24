import { getCustomRepository } from 'typeorm';
import { Connection } from '../models/entities/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface ICreate {
  admin_id?: string;
  user_id: string;
  socket_id: string;
}

interface IConnectionsService {
  handleCreate: ({ admin_id, user_id, socket_id }: ICreate) => Promise<Connection>
}

export class ConnectionsService implements IConnectionsService {
  private connectionsRepository: ConnectionsRepository;

  // @injection
  constructor(connectionsRepository = getCustomRepository(ConnectionsRepository)) {
    this.connectionsRepository = connectionsRepository;
  }

  async handleCreate({ admin_id, user_id, socket_id }: ICreate) {
    let connection = await this.findByUserId({ user_id });

    if (connection) {
      connection.socket_id = socket_id;
      this.updateConnection(connection.id, { socket_id });
    } else {
      connection = await this.createConnection({ admin_id, user_id, socket_id });
    }
    return connection;
  }

  private async findByUserId({ user_id }) {
    const connetion = await this.connectionsRepository.findOne({
      user_id,
    });
    return connetion;
  }

  private async createConnection({ ...params }) {
    const connection = this.connectionsRepository.create({
      ...params,
    });
    await this.connectionsRepository.save(connection);
    return connection;
  }

  private async updateConnection(id: string, { ...params }) {
    const connection = await this.connectionsRepository.update(id, { ...params });
    return connection;
  }
}
