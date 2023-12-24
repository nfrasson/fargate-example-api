import { Module } from "@nestjs/common";
import { JwtHandler } from "./jwt.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [JwtHandler],
  exports: [JwtHandler],
})
export class JwtNestModule {}
