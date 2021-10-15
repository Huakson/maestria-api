import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { RefreshToken } from "../../entities/RefreshToken";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

@injectable()
class CreateRefreshTokenUseCase {
  constructor(
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(userId: string): Promise<RefreshToken> {
    const expiresIn = await dayjs().add(15, "second").unix();

    return this.refreshTokenRepository.create({
      expiresIn,
      userId,
    });
  }
}

export { CreateRefreshTokenUseCase };
