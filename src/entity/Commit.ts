import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Project } from "./Project";

@Entity("commits")
export class Commit extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  sha: string;

  @Column("text")
  branch: string;

  @Column()
  index: number;

  @Column()
  size: number;

  @Column({ default: false })
  complete: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Project, (project: any) => project.commits)
  project: Project;
}
