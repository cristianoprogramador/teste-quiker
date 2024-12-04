import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreatePostDto } from "./dto/create-post.dto";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { UpdatePostDto } from "./dto/update-post.dto";

@ApiTags("Posts")
@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Criar um novo post" })
  @ApiResponse({ status: 201, description: "Post criado com sucesso." })
  create(@Body() data: CreatePostDto, @Request() req) {
    const userId = req.user.id;
    return this.postService.create({ ...data, user_id: userId });
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os posts" })
  @ApiResponse({
    status: 200,
    description: "Lista de posts retornada com sucesso.",
  })
  findAll() {
    return this.postService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Obter um post pelo ID" })
  @ApiResponse({ status: 200, description: "Post retornado com sucesso." })
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Atualizar um post" })
  @ApiResponse({ status: 200, description: "Post atualizado com sucesso." })
  update(@Param("id") id: string, @Body() data: UpdatePostDto, @Request() req) {
    const userId = req.user.id;
    return this.postService.update(+id, data, userId);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Deletar um post" })
  @ApiResponse({ status: 200, description: "Post deletado com sucesso." })
  delete(@Param("id") id: string, @Request() req) {
    const userId = req.user.id;
    return this.postService.delete(+id, userId);
  }

  @Post(":id/reaction")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Alterar reação do post (like ou dislike)" })
  @ApiResponse({ status: 200, description: "Reação atualizada com sucesso." })
  async setReaction(
    @Param("id") id: string,
    @Body() body: { reaction_type: "LIKE" | "DISLIKE" },
    @Request() req
  ) {
    const userId = req.user.id;
    return this.postService.setPostReaction(+id, userId, body.reaction_type);
  }

  @Post(":id/view")
  @ApiOperation({ summary: "Incrementar views de um post" })
  @ApiResponse({ status: 200, description: "View incrementada com sucesso." })
  incrementView(@Param("id") id: string) {
    return this.postService.incrementView(+id);
  }

  @Get(":id/history")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obter o histórico de descrições de um post" })
  @ApiResponse({ status: 200, description: "Histórico retornado com sucesso." })
  getHistory(@Param("id") id: string) {
    return this.postService.getHistory(+id);
  }
}
