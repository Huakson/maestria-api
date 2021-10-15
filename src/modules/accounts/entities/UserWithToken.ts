import { Field, ObjectType } from "type-graphql";

import { RefreshToken } from "./RefreshToken";
import { User } from "./User";

@ObjectType()
class UserWithToken {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;

  @Field(() => RefreshToken)
  refreshToken: RefreshToken;
}

export { UserWithToken };
