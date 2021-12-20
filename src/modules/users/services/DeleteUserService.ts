import { injectable, inject } from "tsyringe"
import crypto from 'crypto'

import AppError from '../../../shared/errors/AppError'


import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<any> {

    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new AppError('Usuário não encontrado')
    }

    await this.usersRepository.delete(id)

    return 'Usuário deletado com sucesso.'
  }
}

export default DeleteUserService;
