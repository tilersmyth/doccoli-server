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
import { ChildrenNodeConnector } from "./connectors/Children";
import { Commit } from "./Commit";

@Entity("files")
export class FileEntity extends BaseEntity {
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

  @ManyToOne(() => Commit)
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;

  @ManyToOne(() => Project, project => project.files)
  project: Project;

  @OneToMany(() => ChildrenNodeConnector, children => children.file)
  children: ChildrenNodeConnector[];
}
