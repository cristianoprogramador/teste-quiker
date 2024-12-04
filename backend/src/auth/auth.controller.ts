import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register-new-client")
  @ApiOperation({ summary: "Registrar um novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário registrado com sucesso." })
  @ApiResponse({ status: 400, description: "Dados inválidos." })
  async register(@Body() data: CreateUserDto) {
    const user = await this.authService.register(data);
    return this.authService.login(user);
  }

  @Post("login")
  @ApiOperation({ summary: "Fazer login do usuário" })
  @ApiResponse({ status: 200, description: "Login bem-sucedido." })
  @ApiResponse({ status: 401, description: "Credenciais inválidas." })
  async login(@Body() data: LoginUserDto) {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      return { error: "Email ou senha inválidos" };
    }
    return this.authService.login(user);
  }

  @Get("verify-token")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Verificar token JWT" })
  @ApiResponse({ status: 200, description: "Token válido." })
  @ApiResponse({ status: 401, description: "Token inválido ou ausente." })
  async verifyToken(@Request() req) {
    return req.user;
  }
}
