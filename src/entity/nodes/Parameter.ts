import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";

import { Commit } from "../Commit";
import { ParameterNodeConnector } from "../connectors/Parameter";
import { ParameterPositionEntity } from "./position";

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

  @OneToMany(() => ParameterPositionEntity, parameter => parameter.node, {
    nullable: true
  })
  position: ParameterPositionEntity[];

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit | null;

  @ManyToOne(() => ParameterNodeConnector, connector => connector.node)
  connector: ParameterNodeConnector;
}
