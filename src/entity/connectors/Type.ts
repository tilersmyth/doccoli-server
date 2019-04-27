import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";

import { TypeNodeEntity } from "../nodes/Type";
import { ChildrenNodeConnector } from "./Children";
import { ParameterNodeConnector } from "./Parameter";
import { SignatureNodeConnector } from "./Signature";
import { TypesNodeConnector } from "./Types";
import { TypeArgumentsNodeConnector } from "./TypeArgument";

@Entity("type_node_connectors")
export class TypeNodeConnector extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => TypeNodeEntity, {
    nullable: true
  })
  @JoinTable()
  node: TypeNodeEntity[];

  @OneToMany(() => ChildrenNodeConnector, children => children.type, {
    nullable: true
  })
  children: ChildrenNodeConnector[];

  @OneToMany(() => ParameterNodeConnector, parameter => parameter.type, {
    nullable: true
  })
  parameters: ParameterNodeConnector[];

  @OneToMany(() => SignatureNodeConnector, signature => signature.type, {
    nullable: true
  })
  signatures: SignatureNodeConnector[];

  @OneToMany(() => TypesNodeConnector, types => types.type, {
    nullable: true
  })
  types: TypesNodeConnector[];

  @OneToMany(
    () => TypeArgumentsNodeConnector,
    typeArguments => typeArguments.type,
    {
      nullable: true
    }
  )
  typeArguments: TypeArgumentsNodeConnector[];
}
