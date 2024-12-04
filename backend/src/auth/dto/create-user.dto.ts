import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "usuario@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Nome do Usuário" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "senha123" })
  @MinLength(6)
  password: string;
}
