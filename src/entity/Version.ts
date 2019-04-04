import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";

import { Project } from "./Project";
import { Commit } from "./Commit";

@Entity("versions")
export class VersionEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  label: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Project, (project: any) => project.commits)
  project: Project;

  @OneToMany(() => Commit, commit => commit.version)
  commits: Commit[];
}
