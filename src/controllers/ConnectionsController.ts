import { Request, Response } from 'express';
import { ConnectionsService } from '../services/ConnectionsService';

export class ConnectionsController {
  private connectionsService: ConnectionsService;

  // @injection
  constructor(connectionsService = new ConnectionsService()) {
    this.connectionsService = connectionsService;
  }

  async create(request: Request, response: Response) {
    const { admin_id, user_id, socket_id } = request.body;
    const connection = await this.connectionsService.handleCreate({ admin_id, user_id, socket_id });
    response.status(201).json(connection);
  }
}
