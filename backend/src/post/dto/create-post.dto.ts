import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({ example: "Título do Post" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: "Descrição detalhada do post" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
