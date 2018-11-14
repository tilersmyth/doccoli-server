import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@Entity("teams")
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user: any) => user.teams)
  user: User;

  @ManyToOne(() => Project, (project: any) => project.teams)
  project: Project;
}
