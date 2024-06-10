import { IsDate, IsInt, IsString } from "class-validator";

export class CreateUserDto {
  @IsInt()
  id: number;

  @IsString()
  readonly nomeDeUsuario: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly senha: string;

  @IsString()
  readonly nomeCompleto: string;

  @IsDate()
  dataDeEntrada: Date;
}
