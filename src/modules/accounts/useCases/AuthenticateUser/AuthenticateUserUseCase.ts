import { compare } from "bcryptjs";
import { container, inject, injectable } from "tsyringe";

import { IAuthenticateUserDTO } from "../../DTOs/IAuthenticateUserDTO";
import { UserWithToken } from "../../entities/UserWithToken";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateRefreshTokenUseCase } from "../CreateRefreshToken/CreateRefreshTokenUseCase";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<UserWithToken> {
    const user = await this.usersRepository.findByEmail(email);
    const generateTokenProvider = container.resolve(GenerateTokenProvider);
    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = await generateTokenProvider.execute(user.id);

    const generateRefreshToken = container.resolve(CreateRefreshTokenUseCase);
    const refreshToken = await generateRefreshToken.execute(user.id);

    return {
      user,
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
