import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<any> {
    return this.prisma.comment.create({
      data,
    });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.comment.findMany({
      include: {
        user: true,
        post: true,
      },
    });
  }

  async findOne(id: number): Promise<any> {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: true,
        post: true,
      },
    });
  }

  async softDeleteComment(
    commentId: number,
    userId: number,
    deletedBy: "author" | "owner"
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException("Comentário não encontrado");
    }

    const post = await this.prisma.post.findUnique({
      where: { id: comment.post_id },
    });
    if (!post) {
      throw new NotFoundException("Post não encontrado");
    }

    const isCommentAuthor = comment.user_id === userId;
    const isPostOwner = post.user_id === userId;

    if (deletedBy === "author" && !isCommentAuthor) {
      throw new ForbiddenException("Você não é o autor deste comentário.");
    }

    if (deletedBy === "owner" && !isPostOwner) {
      throw new ForbiddenException("Você não é o dono deste post.");
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: {
        description: "",
        deletedBy,
      },
    });
  }

  async updateCommentDescription(
    commentId: number,
    userId: number,
    description: string
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException("Comentário não encontrado");
    }

    // Somente o autor do comentário pode editar a descrição
    if (comment.user_id !== userId) {
      throw new ForbiddenException("Você não é o autor deste comentário.");
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { description },
    });
  }
}
