import { Request, Response } from 'express';
import { IMessagesService, MessagesService } from '../services/MessagesService';

export class MessagesController {
  // @injection
  constructor(private messagesService: IMessagesService = new MessagesService()) { }

  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body;
    const message = await this.messagesService.handleCreate({ admin_id, text, user_id });
    response.status(201).json(message);
  }

  async index(request: Request, response: Response) {
    const { id } = request.params;
    const messages = await this.messagesService.handleIndex(id);
    response.status(200).json(messages);
  }
}
