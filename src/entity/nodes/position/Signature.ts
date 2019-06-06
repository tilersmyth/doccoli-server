import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";

import { Commit } from "../../Commit";
import { SignatureNodeEntity } from "../Signature";

@Entity("signature_node_positions")
export class SignaturePositionEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  connectorId: string;

  @Column("int")
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => SignatureNodeEntity, signature => signature.position)
  node: SignatureNodeEntity;

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit;
}
