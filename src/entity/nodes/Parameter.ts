import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Commit } from "../Commit";
import { ParameterNodeConnectorEntity } from "./ParameterConnector";

@Entity("parameter_nodes")
export class ParameterNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Commit)
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;

  @ManyToOne(() => ParameterNodeConnectorEntity, connector => connector.node)
  connector: ParameterNodeConnectorEntity;
}
