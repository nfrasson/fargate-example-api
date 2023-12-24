import * as bcrypt from "bcryptjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptHandler {
  constructor() {}

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
