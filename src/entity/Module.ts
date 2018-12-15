import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { ModuleComment } from "./ModuleComment";
import { File } from "./File";
import { ModuleType } from "./ModuleType";
import { ModuleSignature } from "./ModuleSignature";
import { ModuleParameter } from "./ModuleParameter";

@Entity("modules")
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => ModuleComment, { nullable: true })
  @JoinColumn()
  comment: ModuleComment;

  @ManyToOne(() => Module, module => module.children, { nullable: true })
  parent: Module;

  @OneToMany(() => Module, module => module.parent, { nullable: true })
  children: Module[];

  @OneToOne(() => ModuleType, { nullable: true })
  @JoinColumn()
  type: ModuleType;

  @OneToOne(() => ModuleSignature, { nullable: true })
  @JoinColumn()
  indexSignature: ModuleSignature;

  @OneToOne(() => ModuleSignature, { nullable: true })
  @JoinColumn()
  getSignature: ModuleSignature;

  @OneToMany(() => ModuleSignature, moduleSig => moduleSig.module, {
    nullable: true
  })
  signatures: ModuleSignature[];

  @OneToMany(() => ModuleParameter, param => param.module, { nullable: true })
  typeParameter: ModuleParameter[];

  @ManyToOne(() => File, file => file.modules, { nullable: true })
  file: File;
}
