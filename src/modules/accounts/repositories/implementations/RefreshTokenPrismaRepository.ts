import { client } from "../../../../prisma/client";
import { ICreateRefreshTokenDTO } from "../../DTOs/ICreateRefreshTokenDTO";
import { RefreshToken } from "../../entities/RefreshToken";
import { IRefreshTokenRepository } from "../IRefreshTokenRepository";

class RefreshTokenPrismaRepository implements IRefreshTokenRepository {
  async create(data: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    return client.prisma.refreshToken.create({
      data: {
        userId: data.userId,
        expiresIn: data.expiresIn,
      },
    });
  }

  async findById(refreshTokenId: string): Promise<RefreshToken> {
    return client.prisma.refreshToken.findFirst({
      where: {
        id: refreshTokenId,
      },
    });
  }

  async deleteByUserId(userId: string): Promise<void> {
    client.prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}

export { RefreshTokenPrismaRepository };
