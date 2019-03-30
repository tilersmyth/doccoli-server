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
import { ModuleType } from "./ModuleType";
import { ModuleSignature } from "./ModuleSignature";
import { ModuleChildren } from "./ModuleChildren";

@Entity("module_parameters")
export class ModuleParameter extends BaseEntity {
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

  @OneToOne(() => ModuleType, { nullable: true })
  @JoinColumn()
  type: ModuleType | null;

  @ManyToOne(() => ModuleSignature, sig => sig.parameters, { nullable: true })
  signature: ModuleSignature;

  @ManyToOne(() => ModuleSignature, sig => sig.typeParameter, {
    nullable: true
  })
  typeSignature: ModuleSignature;

  @ManyToOne(() => ModuleChildren, module => module.typeParameter, {
    nullable: true
  })
  module: ModuleChildren;
}
