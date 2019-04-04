import { Entity, BaseEntity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CommentNodeEntity } from "./Comment";

@Entity("comment_node_connectors")
export class CommentNodeConnectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => CommentNodeEntity, node => node.connector, {
    nullable: true
  })
  node: CommentNodeEntity[];
}
