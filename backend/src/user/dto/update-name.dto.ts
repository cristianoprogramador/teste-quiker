import { IsString, IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNameDto {
  @ApiProperty({
    description: "Novo nome do usuário",
    example: "Cristiano Silva",
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;
}
