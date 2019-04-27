import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Commit } from "../Commit";
import { CommentNodeConnector } from "../connectors/Comment";

@Entity("comment_nodes")
export class CommentNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true })
  text: string | null;

  @Column("text", { nullable: true })
  shortText: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Commit)
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit | null;

  @ManyToOne(() => CommentNodeConnector, connector => connector.node)
  connector: CommentNodeConnector;
}
