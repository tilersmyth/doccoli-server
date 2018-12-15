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
import { Module } from "./Module";

@Entity("files")
export class File extends BaseEntity {
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

  @OneToMany(() => Module, module => module.file)
  modules: Module[];
}
