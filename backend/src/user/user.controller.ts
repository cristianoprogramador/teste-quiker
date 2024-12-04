// src/user/user.controller.ts

import { Controller, Patch, Body, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "./user.service";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UpdateNameDto } from "./dto/update-name.dto";
import { UserResponseDto } from "./dto/user-response.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Patch("update-name")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Atualizar o nome do usuário" })
  @ApiBody({ type: UpdateNameDto })
  @ApiResponse({
    status: 200,
    description: "Nome do usuário atualizado com sucesso.",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Usuário não encontrado.",
  })
  async updateName(@Body() body: UpdateNameDto, @Request() req) {
    const userId = req.user.id;
    return this.userService.updateUserName(userId, body.name);
  }
}
