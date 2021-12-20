import AppError from '../../../shared/errors/AppError'

import FakeUsersRepository from "../repositories/Fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(
      fakeUsersRepository,
    );
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "Daniel Dias",
      email: "daniel@eemail.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create two users with the same email", async () => {
    await createUser.execute({
      name: "Daniel Dias",
      email: "daniel@email.com",
      password: "123456",
    });

    await expect(
      createUser.execute({
        name: "Daniel Dias",
        email: "daniel@email.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
