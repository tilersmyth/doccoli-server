import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Commit } from "../../Commit";
import { ParameterNodeEntity } from "../Parameter";

@Entity("parameter_node_positions")
export class ParameterPositionEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  connectorId: string;

  @Column("int")
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ParameterNodeEntity, parameter => parameter.position)
  node: ParameterNodeEntity;

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;
}
