import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Commit } from "../Commit";
import { FileEntity } from "../File";

@Entity("type_nodes")
export class TypeNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true })
  name: string;

  @Column("text")
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => FileEntity, { nullable: true })
  file: FileEntity;

  @ManyToOne(() => Commit)
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;
}
