import AppError from '../../../shared/errors/AppError'

import FakeUsersRepository from "../repositories/Fakes/FakeUsersRepository";
import DeleteUserService from "./DeleteUserService";
import CreateUserService from "./CreateUserService"

let fakeUsersRepository: FakeUsersRepository
let deleteUser: DeleteUserService
let createUser: CreateUserService

describe("DeleteUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    deleteUser = new DeleteUserService(
      fakeUsersRepository,
    );

    createUser = new CreateUserService(
      fakeUsersRepository,
    )
  });

  it("should be able to delete a user", async () => {
    const user = await createUser.execute({
      name: "Daniel Dias",
      email: "daniel@email.com",
      password: "123456",
    })

    expect(
      await deleteUser.execute({ id: user.id })
    ).not.toBeInstanceOf(AppError)
  });
});
