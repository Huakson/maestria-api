import dayjs from "dayjs";
import { container, inject, injectable } from "tsyringe";

import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";
import { DeleteUserRefreshTokenUseCase } from "../DeleteUserRefreshToken/DeleteUserRefreshTokenUseCase";

@injectable()
class RefreshTokenUserUseCase {
  constructor(
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(refresh_token: string): Promise<string> {
    const refreshToken = await this.refreshTokenRepository.findById(
      refresh_token
    );

    if (!refreshToken) {
      throw new Error("Refresh token invalid!");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      const deleteUserRefreshTokenUseCase = container.resolve(
        DeleteUserRefreshTokenUseCase
      );
      await deleteUserRefreshTokenUseCase.execute(refreshToken.userId);
      throw new Error("Refresh token invalid!");
    }

    const generateTokenProvider = container.resolve(GenerateTokenProvider);

    const token = await generateTokenProvider.execute(refreshToken.userId);
    return token;
  }
}

export { RefreshTokenUserUseCase };
