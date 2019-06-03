import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne
} from "typeorm";

import { SignatureNodeEntity } from "../nodes/Signature";
import { CommentNodeConnector } from "./Comment";
import { ChildrenNodeConnector } from "./Children";
import { TypeNodeConnector } from "./Type";
import { ParameterNodeConnector } from "./Parameter";

@Entity("signature_node_connectors")
export class SignatureNodeConnector extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => SignatureNodeEntity, node => node.connector, {
    nullable: true
  })
  node: SignatureNodeEntity[];

  @OneToOne(() => CommentNodeConnector, comment => comment.signatures, {
    nullable: true
  })
  comment: CommentNodeConnector | null;

  @OneToOne(() => TypeNodeConnector, type => type.signatures, {
    nullable: true
  })
  type: TypeNodeConnector | null;

  @OneToMany(
    () => ParameterNodeConnector,
    parameters => parameters.signatures,
    {
      nullable: true
    }
  )
  parameters: ParameterNodeConnector[];

  @ManyToOne(() => ChildrenNodeConnector, children => children.signatures)
  children: ChildrenNodeConnector;
}
