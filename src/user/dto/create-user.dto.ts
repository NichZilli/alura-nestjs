import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsUniqueUserEmail } from "../validators/is-user-email-unique.validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  //@IsString()
  //id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  @ApiProperty({ example: 'Nicholas', description: 'The name of the User' })
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @IsUniqueUserEmail({ message: 'User email must be unique' })
  @ApiProperty({ example: 'nich.zilli@hotmail.com', description: 'The email of the User' })
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @ApiProperty({ example: 'test1234', description: 'The password of the User' })
  readonly password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @ApiProperty({ example: 'Nicholas Gomez Zilli Castro', description: 'The full name of the User' })
  readonly fullName: string;

  //@IsDate()
  //createdAt: Date;

  //@IsDate()
  //updatedAt: Date;
}
