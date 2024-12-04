import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<any> {
    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<any[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return posts.map((post) => ({
      id: post.id,
      user_id: post.user_id,
      user_name: post.user.name,
      title: post.title,
      description: post.description,
      likes: post.likes,
      dislikes: post.dislikes,
      views: post.views,
      createdAt: post.createdAt,
      comments: post.comments.map((comment) => ({
        id: comment.id,
        user_id: comment.user_id,
        user_name: comment.user.name,
        description: comment.description,
        deletedBy: comment.deletedBy,
        createdAt: comment.createdAt,
      })),
    }));
  }

  async findOne(id: number): Promise<any> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        comments: true,
      },
    });
  }

  async update(id: number, data: any, userId: number): Promise<any> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException("Post não encontrado");
    }

    if (post.user_id !== userId) {
      throw new ForbiddenException(
        "Você não tem permissão para atualizar este post."
      );
    }

    await this.prisma.postHistory.create({
      data: {
        post_id: post.id,
        old_description: post.description,
      },
    });

    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: number, userId: number): Promise<any> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException("Post não encontrado");
    }

    if (post.user_id !== userId) {
      throw new ForbiddenException(
        "Você não tem permissão para deletar este post."
      );
    }

    return this.prisma.post.delete({
      where: { id },
    });
  }

  async setPostReaction(
    postId: number,
    userId: number,
    reaction_type: "LIKE" | "DISLIKE"
  ) {
    const existingReaction = await this.prisma.postLike.findUnique({
      where: {
        post_id_user_id: {
          post_id: postId,
          user_id: userId,
        },
      },
    });

    if (!existingReaction) {
      await this.prisma.postLike.create({
        data: {
          post_id: postId,
          user_id: userId,
          reaction_type: reaction_type,
        },
      });

      if (reaction_type === "LIKE") {
        await this.prisma.post.update({
          where: { id: postId },
          data: { likes: { increment: 1 } },
        });
      } else {
        await this.prisma.post.update({
          where: { id: postId },
          data: { dislikes: { increment: 1 } },
        });
      }

      return { message: `Post marcado como ${reaction_type} com sucesso` };
    }

    if (existingReaction.reaction_type === reaction_type) {
      throw new BadRequestException(
        `Você já marcou ${reaction_type.toLowerCase()} neste post.`
      );
    }

    await this.prisma.postLike.update({
      where: {
        post_id_user_id: {
          post_id: postId,
          user_id: userId,
        },
      },
      data: {
        reaction_type,
      },
    });

    if (reaction_type === "LIKE") {
      await this.prisma.post.update({
        where: { id: postId },
        data: {
          dislikes: { decrement: 1 },
          likes: { increment: 1 },
        },
      });
    } else {
      await this.prisma.post.update({
        where: { id: postId },
        data: {
          likes: { decrement: 1 },
          dislikes: { increment: 1 },
        },
      });
    }

    return { message: `Reação alterada para ${reaction_type} com sucesso` };
  }

  async incrementView(postId: number): Promise<any> {
    await this.prisma.post.update({
      where: { id: postId },
      data: { views: { increment: 1 } },
    });
    return { message: "View incrementada com sucesso" };
  }

  async getHistory(postId: number): Promise<any[]> {
    return this.prisma.postHistory.findMany({
      where: { post_id: postId },
      orderBy: { updatedAt: "desc" },
    });
  }
}
