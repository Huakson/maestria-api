import { container } from "tsyringe";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";

import { IAuthenticateUserDTO } from "../DTOs/IAuthenticateUserDTO";
import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../entities/User";
import { UserWithToken } from "../entities/UserWithToken";
import { AuthenticateUserUseCase } from "../useCases/AuthenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../useCases/CreateUser/CreateUserUseCase";
import { RefreshTokenUserUseCase } from "../useCases/RefreshTokenUser/RefreshTokenUserUseCase";

@Resolver(User)
export default class UserResolvers {
  @Authorized()
  @Query(() => String)
  async getData(): Promise<string> {
    return "Resolver com autorização";
  }

  @Mutation(() => User)
  async signUp(@Arg("data") data: ICreateUserDTO): Promise<User> {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    return createUserUseCase.execute(data);
  }

  @Mutation(() => UserWithToken)
  async login(@Arg("data") data: IAuthenticateUserDTO): Promise<UserWithToken> {
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    return authenticateUserUseCase.execute(data);
  }

  @Mutation(() => String)
  async refreshTokenUser(@Arg("data") refreshTokenId: string): Promise<string> {
    const refreshTokenUserUseCase = container.resolve(RefreshTokenUserUseCase);
    return refreshTokenUserUseCase.execute(refreshTokenId);
  }
}
