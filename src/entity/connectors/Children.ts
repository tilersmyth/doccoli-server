import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne
} from "typeorm";

import { ChildrenNodeEntity } from "../nodes/Children";
import { TypeNodeConnector } from "./Type";
import { CommentNodeConnector } from "./Comment";
import { FileEntity } from "../File";
import { SignatureNodeConnector } from "./Signature";
import { ParameterNodeConnector } from "./Parameter";

@Entity("children_node_connectors")
export class ChildrenNodeConnector extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => ChildrenNodeEntity, node => node.connector, {
    nullable: true
  })
  node: ChildrenNodeEntity[];

  @ManyToOne(() => ChildrenNodeConnector, parent => parent.children, {
    nullable: true
  })
  parentChildren: ChildrenNodeConnector | null;

  @OneToMany(() => ChildrenNodeConnector, children => children.parentChildren, {
    nullable: true
  })
  children: ChildrenNodeConnector[];

  @OneToOne(() => CommentNodeConnector, comment => comment.children, {
    nullable: true
  })
  comment: CommentNodeConnector | null;

  @OneToOne(() => TypeNodeConnector, type => type.children, {
    nullable: true
  })
  type: TypeNodeConnector | null;

  @OneToMany(() => SignatureNodeConnector, signature => signature.children, {
    nullable: true
  })
  signatures: SignatureNodeConnector[];

  @OneToMany(() => ParameterNodeConnector, parameter => parameter.children, {
    nullable: true
  })
  parameters: ParameterNodeConnector[];

  @ManyToOne(() => FileEntity, file => file.children, {
    nullable: true
  })
  file: FileEntity | null;
}
