import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

export class UsersController {
  private usersService: UsersService;

  // @injection
  constructor(usersService = new UsersService()) {
    this.usersService = usersService;
  }

  async create(request: Request, response: Response) {
    const { email } = request.body;
    const user = await this.usersService.handleCreate({ email });
    return response.json(user);
  }
}
