import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { CommentNodeConnectorEntity } from "./CommentConnector";
import { Commit } from "../Commit";

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
  endCommit: Commit;

  @ManyToOne(() => CommentNodeConnectorEntity, connector => connector.node)
  connector: CommentNodeConnectorEntity;
}
