import { Field, InputType } from "type-graphql";

@InputType()
class ICreateRefreshTokenDTO {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  expiresIn: number;
}

export { ICreateRefreshTokenDTO };
