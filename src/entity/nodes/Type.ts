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
import { FileEntity } from "../File";
import { TypeNodeConnector } from "../connectors/Type";
import { TypePositionEntity } from "./position";

@Entity("type_nodes")
export class TypeNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true })
  name: string;

  @Column("text")
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TypePositionEntity, type => type.node, {
    nullable: true
  })
  position: TypePositionEntity[];

  @ManyToOne(() => FileEntity, { nullable: true })
  file: FileEntity;

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;

  @ManyToOne(() => TypeNodeConnector, connector => connector.node)
  connector: TypeNodeConnector;
}
