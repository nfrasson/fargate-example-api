import helmet from "@fastify/helmet";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import fastifyCsrf from "@fastify/csrf-protection";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { level: "warn" } })
  );

  app.register(helmet);
  app.enableCors();
  await app.register(fastifyCsrf);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000, "0.0.0.0");
}
bootstrap();
