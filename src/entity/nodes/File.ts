import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";

import { Project } from "../Project";
import { ChildrenNodeEntity } from "./Children";

@Entity("files_node")
export class FileNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  kind: string;

  @Column("text")
  path: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Project, project => project.files)
  project: Project;

  @OneToMany(() => ChildrenNodeEntity, node => node.file)
  children: ChildrenNodeEntity[];
}
