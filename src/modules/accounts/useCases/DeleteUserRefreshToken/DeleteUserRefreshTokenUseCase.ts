import { inject, injectable } from "tsyringe";

import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

@injectable()
class DeleteUserRefreshTokenUseCase {
  constructor(
    @inject("RefreshTokenRepository")
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(userId: string): Promise<void> {
    this.refreshTokenRepository.deleteByUserId(userId);
  }
}

export { DeleteUserRefreshTokenUseCase };
