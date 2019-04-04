import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne
} from "typeorm";
import { TypeNodeEntity } from "./Type";

@Entity("type_node_connectors")
export class TypeNodeConnectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => TypeNodeConnectorEntity, type => type.types, {
    nullable: true
  })
  parentType: TypeNodeConnectorEntity | null;

  @OneToMany(() => TypeNodeConnectorEntity, types => types.parentType, {
    nullable: true
  })
  types: TypeNodeConnectorEntity[];

  @OneToMany(() => TypeNodeEntity, node => node.connector, {
    nullable: true
  })
  node: TypeNodeEntity[];
}
