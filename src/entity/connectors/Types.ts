import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from "typeorm";

import { TypeNodeEntity } from "../nodes/Type";
import { TypeNodeConnector } from "./Type";
import { TypeArgumentsNodeConnector } from "./TypeArgument";

@Entity("types_node_connectors")
export class TypesNodeConnector extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => TypeNodeEntity, {
    nullable: true
  })
  @JoinTable()
  node: TypeNodeEntity[];

  @ManyToOne(() => TypeNodeConnector, type => type.types, {
    nullable: true
  })
  type: TypeNodeConnector | null;

  @ManyToOne(
    () => TypeArgumentsNodeConnector,
    typeArguments => typeArguments.types,
    {
      nullable: true
    }
  )
  typeArguments: TypeArgumentsNodeConnector | null;
}
