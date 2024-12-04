import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUserName(userId: number, newName: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado.");
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: { name: newName },
    });
  }
}
