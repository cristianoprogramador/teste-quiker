import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({
    description: "ID do usuário",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "Nome do usuário",
    example: "Cristiano Silva",
  })
  name: string;

  @ApiProperty({
    description: "Email do usuário",
    example: "cristiano@example.com",
  })
  email: string;

  // Adicione outros campos conforme necessário
}
