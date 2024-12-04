import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  post_id: number;

  @ApiProperty({ example: "Conteúdo do comentário" })
  @IsString()
  @IsNotEmpty()
  description: string;
}
