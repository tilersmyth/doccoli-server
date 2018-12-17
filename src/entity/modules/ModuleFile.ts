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
import { ModuleChildren } from "./ModuleChildren";

@Entity("module_files")
export class ModuleFile extends BaseEntity {
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

  @OneToMany(() => ModuleChildren, module => module.file)
  children: ModuleChildren[];
}
