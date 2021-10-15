import { container } from "tsyringe";

import { RefreshTokenPrismaRepository } from "../../modules/accounts/repositories/implementations/RefreshTokenPrismaRepository";
import { UsersPrismaRepository } from "../../modules/accounts/repositories/implementations/UsersPrismaRepository";
import { IRefreshTokenRepository } from "../../modules/accounts/repositories/IRefreshTokenRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersPrismaRepository
);

container.registerSingleton<IRefreshTokenRepository>(
  "RefreshTokenRepository",
  RefreshTokenPrismaRepository
);
