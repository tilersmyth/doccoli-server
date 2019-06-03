import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";

import { ChildrenNodeConnector } from "./Children";
import { ParameterNodeConnector } from "./Parameter";
import { SignatureNodeConnector } from "./Signature";
import { TypeNodeEntity } from "../nodes/Type";

@Entity("type_node_connectors")
export class TypeNodeConnector extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => TypeNodeEntity, node => node.connector, {
    nullable: true
  })
  node: TypeNodeEntity[];

  @OneToOne(() => ChildrenNodeConnector, children => children.type, {
    nullable: true
  })
  @JoinColumn()
  children: ChildrenNodeConnector | null;

  @OneToOne(() => ParameterNodeConnector, parameter => parameter.type, {
    nullable: true
  })
  @JoinColumn()
  parameters: ParameterNodeConnector | null;

  @OneToOne(() => SignatureNodeConnector, signature => signature.type, {
    nullable: true
  })
  @JoinColumn()
  signatures: SignatureNodeConnector | null;

  @OneToMany(() => TypeNodeConnector, inner => inner.parentTypeArguments, {
    nullable: true
  })
  typeArguments: TypeNodeConnector[];

  @ManyToOne(() => TypeNodeConnector, parent => parent.typeArguments, {
    nullable: true
  })
  parentTypeArguments: TypeNodeConnector | null;

  @OneToMany(() => TypeNodeConnector, inner => inner.parentTypes, {
    nullable: true
  })
  types: TypeNodeConnector[];

  @ManyToOne(() => TypeNodeConnector, parent => parent.types, {
    nullable: true
  })
  parentTypes: TypeNodeConnector | null;
}
