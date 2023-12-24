import { User } from "./user.entity";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { JwtNestModule } from "../services/jwt/jwt.module";
import { BcryptModule } from "../services/crypto/bcrypt.module";
import { TypeOrmUserRepository } from "@src/db/typeorm/typeorm.user.repository";
import { IUserRepository } from "@src/interfaces/user.interface";
import { ICryptoHandler } from "@src/interfaces/crypto.interface";
import { IJwtHandler } from "@src/interfaces/jwt.interface";
import { BcryptHandler } from "@src/services/crypto/bcrypt.service";
import { JwtHandler } from "@src/services/jwt/jwt.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), BcryptModule, JwtNestModule],
  providers: [
    TypeOrmUserRepository,
    {
      provide: UserService,
      useFactory: (
        jwtHandler: IJwtHandler,
        cryptoService: ICryptoHandler,
        userRepository: IUserRepository
      ) => {
        return new UserService(jwtHandler, cryptoService, userRepository);
      },
      inject: [JwtHandler, BcryptHandler, TypeOrmUserRepository],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
