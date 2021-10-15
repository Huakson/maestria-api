import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class ICreateUserDTO {
  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  @IsEmail()
  email: string;
}

export { ICreateUserDTO };
