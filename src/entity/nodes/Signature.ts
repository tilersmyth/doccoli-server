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
import { SignatureNodeConnector } from "../connectors/Signature";
import { SignaturePositionEntity } from "./position";

@Entity("signature_nodes")
export class SignatureNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  kind: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => SignaturePositionEntity, signature => signature.node, {
    nullable: true
  })
  position: SignaturePositionEntity[];

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit | null;

  @ManyToOne(() => SignatureNodeConnector, connector => connector.node)
  connector: SignatureNodeConnector;
}
