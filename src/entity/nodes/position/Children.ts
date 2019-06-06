import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Commit } from "../../Commit";
import { ChildrenNodeEntity } from "../Children";

@Entity("children_node_positions")
export class ChildrenPositionEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  connectorId: string;

  @Column("int")
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ChildrenNodeEntity, children => children.position)
  node: ChildrenNodeEntity;

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;
}
