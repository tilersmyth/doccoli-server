import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { ChildrenNodeConnectorEntity } from "./ChildrenConnector";

import { Commit } from "../Commit";

@Entity("children_nodes")
export class ChildrenNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column({ default: false })
  tagged: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Commit)
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;

  @ManyToOne(() => ChildrenNodeConnectorEntity, connector => connector.node)
  connector: ChildrenNodeConnectorEntity;
}
