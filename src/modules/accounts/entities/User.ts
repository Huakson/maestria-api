import { IsEmail } from "class-validator";
import { Field, ObjectType, ID } from "type-graphql";
import { v4 } from "uuid";

@ObjectType()
class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Date)
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}

export { User };
