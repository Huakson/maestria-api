import { ICreateRefreshTokenDTO } from "../DTOs/ICreateRefreshTokenDTO";
import { RefreshToken } from "../entities/RefreshToken";

interface IRefreshTokenRepository {
  create(data: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  findById(refreshTokenId: string): Promise<RefreshToken>;
  deleteByUserId(userId: string): Promise<void>;
}

export { IRefreshTokenRepository };
