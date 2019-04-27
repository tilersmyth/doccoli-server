import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";

import { TypeNodeEntity } from "../nodes/Type";
import { TypeNodeConnector } from "./Type";
import { TypesNodeConnector } from "./Types";

@Entity("type_argument_node_connectors")
export class TypeArgumentsNodeConnector extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => TypeNodeEntity, {
    nullable: true
  })
  @JoinTable()
  node: TypeNodeEntity[];

  @ManyToOne(() => TypeNodeConnector, type => type.typeArguments, {
    nullable: true
  })
  type: TypeNodeConnector | null;

  @OneToMany(() => TypesNodeConnector, types => types.typeArguments, {
    nullable: true
  })
  types: TypesNodeConnector[];
}
