import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { ModuleType } from "./ModuleType";
import { ModuleParameter } from "./ModuleParameter";
import { ModuleComment } from "./ModuleComment";
import { Module } from "./Module";

@Entity("module_signatures")
export class ModuleSignature extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  kind: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => ModuleComment)
  @JoinColumn()
  comment: ModuleComment;

  @OneToOne(() => ModuleType)
  @JoinColumn()
  type: ModuleType;

  @OneToMany(() => ModuleParameter, param => param.paramSig, { nullable: true })
  parameters: ModuleParameter[];

  @OneToMany(() => ModuleParameter, param => param.paramTypeSig, {
    nullable: true
  })
  typeParameter: ModuleParameter[];

  @ManyToOne(() => Module, module => module.signatures, { nullable: true })
  module: Module;
}
