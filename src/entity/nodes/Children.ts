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
import { ChildrenNodeConnector } from "../connectors/Children";
import { ChildrenPositionEntity } from "./position";

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

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ChildrenPositionEntity, children => children.node, {
    nullable: true
  })
  position: ChildrenPositionEntity[];

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;

  @ManyToOne(() => ChildrenNodeConnector, connector => connector.node)
  connector: ChildrenNodeConnector;
}
