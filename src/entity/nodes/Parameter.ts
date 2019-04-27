import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Commit } from "../Commit";
import { ParameterNodeConnector } from "../connectors/Parameter";

@Entity("parameter_nodes")
export class ParameterNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  kind: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Commit)
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit | null;

  @ManyToOne(() => ParameterNodeConnector, connector => connector.node)
  connector: ParameterNodeConnector;
}
