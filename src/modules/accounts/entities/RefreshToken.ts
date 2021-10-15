import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
class RefreshToken {
  @Field(() => ID)
  id: string;

  @Field(() => Number)
  expiresIn: number;

  @Field(() => String)
  userId: string;
}

export { RefreshToken };
