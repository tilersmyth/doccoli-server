import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne
} from "typeorm";

import { ParameterNodeEntity } from "../nodes/Parameter";
import { ChildrenNodeConnector } from "./Children";
import { SignatureNodeConnector } from "./Signature";
import { TypeNodeConnector } from "./Type";

@Entity("parameter_node_connectors")
export class ParameterNodeConnector extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => ParameterNodeEntity, node => node.connector, {
    nullable: true
  })
  node: ParameterNodeEntity[];

  @OneToOne(() => TypeNodeConnector, type => type.parameters, {
    nullable: true
  })
  type: TypeNodeConnector | null;

  @ManyToOne(() => SignatureNodeConnector, signature => signature.parameters, {
    nullable: true
  })
  signatures: SignatureNodeConnector | null;

  @ManyToOne(() => ChildrenNodeConnector, children => children.parameters, {
    nullable: true
  })
  children: ChildrenNodeConnector | null;
}
