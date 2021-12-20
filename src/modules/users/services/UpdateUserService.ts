import { injectable, inject } from "tsyringe"
import crypto from 'crypto'

import AppError from '../../../shared/errors/AppError'


import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    password
  }: IRequest): Promise<User> {

    try {
      const user = await this.usersRepository.findById(id)

      if (!user) {
        throw new AppError('Usuário não encontrado')
      }

      const emailAlreadyExists = await this.usersRepository.findByEmail(email)

      if (emailAlreadyExists && emailAlreadyExists.id !== id) {
        throw new AppError('Email já cadastrado com outro usuário.')
      }

      const passwordHash = crypto.createHash('md5').update(password).digest('hex')

      user.name = name ? name : user.name
      user.email = email ? email : user.email
      user.password = passwordHash ? passwordHash : user.password


      return await this.usersRepository.save(user)
    } catch (err) {
      throw new AppError("Parece que algo saiu errado.", 500)
    }
  }
}

export default UpdateUserService;
