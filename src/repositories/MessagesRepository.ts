import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../models/entities/Message';

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> { }
