import AppError from '../../../shared/errors/AppError'

import FakeUsersRepository from "../repositories/Fakes/FakeUsersRepository";
import UpdateUserService from "./UpdateUserService";

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateUserService = new UpdateUserService(
      fakeUsersRepository,
    );
  });

  it("should be able to update user profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "Daniel Dias",
      email: "daniel@email.com",
      password: "123456",
    });

    const updatedUser = await updateUserService.execute({
      id: user.id,
      name: "Daniel Costa",
      email: "daniel555@email.com",
      password: "654321"
    });

    expect(updatedUser.name).toBe("Daniel Costa");
    expect(updatedUser.email).toBe("daniel555@email.com");
    expect(updatedUser.password).toBe("654321");
  });

  it("should not be able to update the profile from non-existing user", async () => {
    expect(
      updateUserService.execute({
        id: "ZZZ",
        name: "Daniel Dias",
        email: "daniel@email.com",
        password: "123456"
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to change to another user e-mail", async () => {
    await fakeUsersRepository.create({
      name: "Daniel Dias",
      email: "daniel@email.com",
      password: "123456",
    });

    const user = await fakeUsersRepository.create({
      name: "Daniel Silva",
      email: "daniel.silva@email.com",
      password: "123456",
    });

    await expect(
      updateUserService.execute({
        id: user.id,
        name: "Daniel Silva",
        email: "daniel@email.com",
        password: "123456"
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
