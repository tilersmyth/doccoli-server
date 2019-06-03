import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Commit } from "../Commit";
import { ChildrenNodeConnector } from "../connectors/Children";

@Entity("children_nodes")
export class ChildrenNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column({ default: false })
  tagged: boolean;

  @Column("text")
  kind: string;

  @Column()
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;

  @ManyToOne(() => ChildrenNodeConnector, connector => connector.node)
  connector: ChildrenNodeConnector;
}
