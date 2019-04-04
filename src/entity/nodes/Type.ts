import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Commit } from "../Commit";
import { TypeNodeConnectorEntity } from "./TypeConnector";

@Entity("type_nodes")
export class TypeNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true }) // nullable when used in types
  name: string;

  @Column("text")
  type: string;

  @Column("text", { nullable: true })
  refPath: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Commit)
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;

  @ManyToOne(() => TypeNodeConnectorEntity, connector => connector.node)
  connector: TypeNodeConnectorEntity;
}
