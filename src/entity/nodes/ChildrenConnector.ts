import {
  Entity,
  BaseEntity,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from "typeorm";

import { FileEntity } from "../File";
import { CommentNodeConnectorEntity } from "./CommentConnector";
import { TypeNodeConnectorEntity } from "./TypeConnector";
import { SignatureNodeConnectorEntity } from "./SignatureConnector";
import { ParameterNodeConnectorEntity } from "./ParameterConnector";
import { ChildrenNodeEntity } from "./Children";

@Entity("children_node_connectors")
export class ChildrenNodeConnectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => ChildrenNodeEntity, node => node.connector, {
    nullable: true
  })
  node: ChildrenNodeEntity[];

  @OneToOne(() => CommentNodeConnectorEntity, { nullable: true })
  @JoinColumn()
  comment: CommentNodeConnectorEntity | null;

  @ManyToOne(() => ChildrenNodeConnectorEntity, node => node.children, {
    nullable: true
  })
  parent: ChildrenNodeConnectorEntity;

  @OneToMany(() => ChildrenNodeConnectorEntity, node => node.parent, {
    nullable: true
  })
  children: ChildrenNodeConnectorEntity[];

  @OneToOne(() => TypeNodeConnectorEntity, { nullable: true })
  @JoinColumn()
  type: TypeNodeConnectorEntity | null;

  @OneToOne(() => SignatureNodeConnectorEntity, { nullable: true })
  @JoinColumn()
  indexSignature: SignatureNodeConnectorEntity | null;

  @OneToOne(() => SignatureNodeConnectorEntity, { nullable: true })
  @JoinColumn()
  getSignature: SignatureNodeConnectorEntity | null;

  @OneToMany(
    () => SignatureNodeConnectorEntity,
    signature => signature.children,
    {
      nullable: true
    }
  )
  signatures: SignatureNodeConnectorEntity[];

  @OneToMany(() => ParameterNodeConnectorEntity, param => param.children, {
    nullable: true
  })
  typeParameter: ParameterNodeConnectorEntity[];

  @ManyToOne(() => FileEntity, file => file.children, {
    nullable: true
  })
  file: FileEntity;
}
