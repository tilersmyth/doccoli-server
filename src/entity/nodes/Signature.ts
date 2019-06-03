import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne
} from "typeorm";
import { Commit } from "../Commit";
import { SignatureNodeConnector } from "../connectors/Signature";

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

  @Column({ nullable: true })
  position: number;

  @ManyToOne(() => Commit, { nullable: false })
  startCommit: Commit;

  @ManyToOne(() => Commit, {
    nullable: true
  })
  endCommit: Commit | null;

  @ManyToOne(() => SignatureNodeConnector, connector => connector.node)
  connector: SignatureNodeConnector;
}
