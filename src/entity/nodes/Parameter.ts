import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { TypeNodeEntity } from "./Type";
import { SignatureNodeEntity } from "./Signature";
import { ChildrenNodeEntity } from "./Children";

@Entity("parameters_node")
export class ParameterNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  startCommit: string;

  @Column({ nullable: true })
  endCommit: string;

  @OneToOne(() => TypeNodeEntity, { nullable: true })
  @JoinColumn()
  type: TypeNodeEntity | null;

  @ManyToOne(() => SignatureNodeEntity, sig => sig.parameters, {
    nullable: true
  })
  signature: SignatureNodeEntity;

  @ManyToOne(() => SignatureNodeEntity, sig => sig.typeParameter, {
    nullable: true
  })
  typeSignature: SignatureNodeEntity;

  @ManyToOne(() => ChildrenNodeEntity, node => node.typeParameter, {
    nullable: true
  })
  node: ChildrenNodeEntity;
}
