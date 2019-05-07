import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Project } from "./Project";
import { VersionEntity } from "./Version";

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
  nodesPublished: number;

  @Column()
  nodesTotal: number;

  @Column({ default: false })
  complete: boolean;

  @Column({ default: false })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project: any) => project.commits)
  project: Project;

  @ManyToOne(() => VersionEntity, (version: any) => version.commits)
  version: VersionEntity;
}
