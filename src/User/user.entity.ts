import { randomUUID } from "node:crypto";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  userId?: string;

  @Column()
  userFirstname: string;

  @Column()
  userLastname: string;

  @PrimaryColumn()
  userEmail: string;

  @Column()
  userPassword: string;

  constructor(props: User) {
    Object.assign(this, props);
    this.userId = props?.userId || randomUUID();
  }
}
