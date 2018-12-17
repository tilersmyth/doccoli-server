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
import { ModuleChildren } from "./ModuleChildren";

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

  @OneToOne(() => ModuleComment, { nullable: true })
  @JoinColumn()
  comment: ModuleComment | null;

  @OneToOne(() => ModuleType, { nullable: true })
  @JoinColumn()
  type: ModuleType | null;

  @OneToMany(() => ModuleParameter, parameters => parameters.signature, {
    nullable: true
  })
  parameters: ModuleParameter[];

  @OneToMany(() => ModuleParameter, param => param.typeSignature, {
    nullable: true
  })
  typeParameter: ModuleParameter[];

  @ManyToOne(() => ModuleChildren, module => module.signatures, {
    nullable: true
  })
  module: ModuleChildren;
}
