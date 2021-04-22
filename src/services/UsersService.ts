import { getCustomRepository } from 'typeorm';
import { User } from '../models/entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface ICreate {
  email: string;
}

export interface IUsersService {
  handleCreate: ({ email }: ICreate) => Promise<User>
}

export class UsersService implements IUsersService {
  private usersRepository: UsersRepository;

  // @injection
  constructor(usersRepository = getCustomRepository(UsersRepository)) {
    this.usersRepository = usersRepository;
  }

  async handleCreate({ email }: ICreate) {
    const userExist = await this.usersRepository.findOne({ email });

    if (userExist) {
      return userExist;
    }
    const user = this.usersRepository.create({ email });
    await this.usersRepository.save(user);

    return user;
  }
}
