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
import { Module } from "./Module";

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

  @OneToOne(() => ModuleType, { nullable: true })
  @JoinColumn()
  type: ModuleType;

  @ManyToOne(() => ModuleSignature, sig => sig.parameters, { nullable: true })
  paramSig: ModuleSignature;

  @ManyToOne(() => ModuleSignature, sig => sig.typeParameter, {
    nullable: true
  })
  paramTypeSig: ModuleSignature;

  @ManyToOne(() => Module, module => module.typeParameter, { nullable: true })
  module: Module;
}
