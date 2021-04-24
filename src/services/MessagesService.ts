import { getCustomRepository } from 'typeorm';
import { Message } from '../models/entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface ICreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

export interface IMessagesService {
  handleCreate: ({ admin_id, text, user_id }: ICreate) => Promise<Message>
  handleIndex(user_id: string): Promise<Message[]>
}

export class MessagesService implements IMessagesService {
  private messagesRepository: MessagesRepository;

  // @injection
  constructor(messagesRepository = getCustomRepository(MessagesRepository)) {
    this.messagesRepository = messagesRepository;
  }

  async handleCreate({ admin_id, text, user_id }: ICreate) {
    const message = this.messagesRepository.create({
      admin_id,
      text,
      user_id,
    });
    await this.messagesRepository.save(message);
    return message;
  }

  async handleIndex(user_id: string) {
    const messages = await this.messagesRepository.find({
      where: { user_id },
      relations: ['user'],
    });
    return messages;
  }
}
