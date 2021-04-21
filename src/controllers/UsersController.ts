import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

export class UsersController {
  // @injection
  constructor(private usersService = new UsersService()) { }

  async create(request: Request, response: Response) {
    const { email } = request.body;
    const user = await this.usersService.handleCreate({ email });
    return response.json(user);
  }
}