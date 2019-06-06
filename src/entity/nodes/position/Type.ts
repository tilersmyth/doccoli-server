import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Commit } from "../../Commit";
import { TypeNodeEntity } from "../Type";

@Entity("type_node_positions")
export class TypePositionEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  connectorId: string;

  @Column("int")
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => TypeNodeEntity, type => type.position)
  node: TypeNodeEntity;

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;
}
