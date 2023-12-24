import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DefaultController } from "./default.controller";
import { User } from "./User/user.entity";
import { UserModule } from "./User/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      port: 5432,
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: "lambda_api_example",
      entities: [User],
      ssl: !(process.env.NODE_ENV === "local"),
      logging: false,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [DefaultController],
})
export class AppModule {}
