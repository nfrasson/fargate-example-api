import fs from "fs";
import { Module } from "@nestjs/common";
import { User } from "./User/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./User/user.module";
import { DefaultController } from "./default.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      port: 5432,
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: "fargate_api_example",
      entities: [User],
      ssl:
        (process.env.NODE_ENV === "production" && {
          rejectUnauthorized: true,
          ca: fs
            .readFileSync(`${__dirname}/assets/rds-ca-2019-root.pem`)
            .toString(),
        }) ||
        false,
      logging: false,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [DefaultController],
})
export class AppModule {}
