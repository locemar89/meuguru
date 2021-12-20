import { getRepository, Repository, Not, ILike } from "typeorm";

import IUsersRepository from '../../../repositories/IUsersRepository';
import IUserDTO from '../../../dtos/IUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async find(filter: string, page: number, limit: number): Promise<any | undefined> {
    let user: User[]
    if (filter) {
        user = await this.ormRepository.find({
            where: [
              { name: ILike(`%${filter}%`) },
              { email: ILike(`%${filter}%`) },
            ],
            skip: page,
            take: limit
        })
    } else {
        user = await this.ormRepository.find({
          skip: page,
          take: limit
        })
    }

    const countUsers = await this.ormRepository.count()


    return {
      totalRecords: countUsers,
      users: user
    };
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ 
      where: { email },
    });

    return user;
  }

  public async create(userData: IUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<any> {
    return this.ormRepository.delete(id);
  }
}

export default UsersRepository;
