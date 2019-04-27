import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany
} from "typeorm";

import { CommentNodeEntity } from "../nodes/Comment";
import { ChildrenNodeConnector } from "./Children";
import { SignatureNodeConnector } from "./Signature";

@Entity("comment_node_connectors")
export class CommentNodeConnector extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => CommentNodeEntity, node => node.connector, {
    nullable: true
  })
  node: CommentNodeEntity[];

  @OneToOne(() => ChildrenNodeConnector, children => children.comment, {
    nullable: true
  })
  @JoinColumn()
  children: ChildrenNodeConnector | null;

  @OneToOne(() => SignatureNodeConnector, signature => signature.comment, {
    nullable: true
  })
  @JoinColumn()
  signatures: SignatureNodeConnector | null;
}
