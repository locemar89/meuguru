import { injectable, inject } from "tsyringe"

import AppError from '../../../shared/errors/AppError'


import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  filter?: string;
  page?: string;
  limit?: string;
}

@injectable()
class FindUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({filter, page, limit }: IRequest): Promise<Object | undefined> {

    const pageInt = parseInt(page as any, 10) || 1
    const limitInt = parseInt(limit as any, 10) || 10

    const startPage = (pageInt - 1) * limitInt
    const user = await this.usersRepository.find(filter, startPage, limitInt)

    const totalPages = Math.ceil(user.totalRecords / limitInt)
    const nextPage = pageInt < totalPages ? pageInt + 1 : null

    return { 
      nextPage,
      totalPages,
      totalRecords: user.totalRecords,
      users: user.users 
    }
  }
}

export default FindUsersService;
