import { Controller, Patch, Body, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Patch("update-name")
  @UseGuards(JwtAuthGuard)
  async updateName(@Body() body: { name: string }, @Request() req) {
    const userId = req.user.id;
    return this.userService.updateUserName(userId, body.name);
  }
}
