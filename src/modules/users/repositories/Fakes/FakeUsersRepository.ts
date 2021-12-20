import { uuid } from "uuidv4";

import IUsersRepository from '../IUsersRepository';
import IUserDTO from '../../dtos/IUserDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async find(filter: string): Promise<User[] | undefined> {
    if (filter) {
      return this.users.filter(user => { 
        user.name.includes(filter) || user.email.includes(filter)
      });
    }

    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
      },
      userData,
    );

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      findIndex => findIndex.id === user.id,
    );

    this.users[userIndex] = user;

    return user;
  }

  public async delete(id: string): Promise<any> {
    const userIndex = this.users.findIndex(user => user.id === id)

    if (userIndex > -1) {
      this.users.splice(userIndex, 1)
    }

    return 'Usuário deletado com sucesso'
  }
}

export default FakeUsersRepository;
