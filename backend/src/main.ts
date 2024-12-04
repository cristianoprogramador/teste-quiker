import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Backend para Quiker")
    .setDescription("Documentação para o backend")
    .setVersion("1.0")
    .addBearerAuth({ in: "header", type: "http" })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      defaultModelsExpandDepth: -1,
      operationsSorter: function (a: any, b: any) {
        const order = {
          post: "0",
          get: "1",
          put: "2",
          delete: "3",
          patch: "4",
        };
        return (
          order[a.get("method")].localeCompare(order[b.get("method")]) ||
          a.get("path").localeCompare(b.get("path"))
        );
      },
    },
  });

  await app.listen(3000);
}

bootstrap();
