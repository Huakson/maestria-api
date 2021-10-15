import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
class IAuthenticateUserDTO {
  @Field(() => String)
  password: string;

  @Field(() => String)
  @IsEmail()
  email: string;
}

export { IAuthenticateUserDTO };
