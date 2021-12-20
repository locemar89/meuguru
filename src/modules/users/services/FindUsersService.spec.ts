import AppError from '../../../shared/errors/AppError'

import User from '../infra/typeorm/entities/User'

import FakeUsersRepository from "../repositories/Fakes/FakeUsersRepository";
import FindUsersService from "./FindUsersService";
import CreateUserService from "./CreateUserService"

let fakeUsersRepository: FakeUsersRepository
let findUsers: FindUsersService
let createUser: CreateUserService

describe("DeleteUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    findUsers = new FindUsersService(
      fakeUsersRepository,
    );

    createUser = new CreateUserService(
      fakeUsersRepository,
    )
  })

  it("should be able to find users", async () => {
    const user = await createUser.execute({
      name: "Daniel Dias",
      email: "daniel@email.com",
      password: "123456",
    })

    const userFound = await findUsers.execute({ filter: "Dias"})

    expect(userFound).toBeInstanceOf(User)
  })
})
