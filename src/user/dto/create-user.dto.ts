import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { IsUniqueUserEmail } from "../validators/is-user-email-unique.validator";

export class CreateUserDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @IsUniqueUserEmail({ message: 'User email must be unique' })
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly fullName: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
