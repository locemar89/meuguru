import User from '../infra/typeorm/entities/User'
import IUserDTO from '../dtos/IUserDTO'

export default interface IUsersRepository {
  find(filter?: string, page?: number, limit?: number): Promise<any | undefined>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: IUserDTO): Promise<User>
  save(user: User): Promise<User>
  delete(id: string): Promise<any>
}
