import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Put,
  Patch,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { CreateCommentDto } from "./dto/create-comment.dto";

@ApiTags("Comments")
@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Criar um novo comentário" })
  @ApiResponse({ status: 201, description: "Comentário criado com sucesso." })
  create(@Body() data: CreateCommentDto, @Request() req) {
    const userId = req.user.id;
    return this.commentService.create({ ...data, user_id: userId });
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os comentários" })
  @ApiResponse({
    status: 200,
    description: "Lista de comentários retornada com sucesso.",
  })
  findAll() {
    return this.commentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Obter um comentário pelo ID" })
  @ApiResponse({
    status: 200,
    description: "Comentário retornado com sucesso.",
  })
  findOne(@Param("id") id: string) {
    return this.commentService.findOne(+id);
  }

  @Put(":commentId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Marcar comentário como excluído" })
  @ApiResponse({ status: 200, description: "Comentário excluído logicamente." })
  async softDeleteComment(
    @Param("commentId") commentId: string,
    @Body() body: { deletedBy: "author" | "owner" },
    @Request() req
  ) {
    const userId = req.user.id;
    return this.commentService.softDeleteComment(
      +commentId,
      userId,
      body.deletedBy
    );
  }

  @Patch(":commentId/description")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Atualizar a descrição de um comentário" })
  @ApiResponse({
    status: 200,
    description: "Comentário atualizado com sucesso.",
  })
  async updateCommentDescription(
    @Param("commentId") commentId: string,
    @Body() body: { description: string },
    @Request() req
  ) {
    const userId = req.user.id;
    return this.commentService.updateCommentDescription(
      +commentId,
      userId,
      body.description
    );
  }
}
