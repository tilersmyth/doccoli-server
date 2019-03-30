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
import { ModuleFile } from "./ModuleFile";
import { ModuleType } from "./ModuleType";
import { ModuleSignature } from "./ModuleSignature";
import { ModuleParameter } from "./ModuleParameter";

@Entity("module_children")
export class ModuleChildren extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column({ default: false })
  tagged: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  startCommit: string;

  @Column({ nullable: true })
  endCommit: string;

  @OneToOne(() => ModuleComment, { nullable: true })
  @JoinColumn()
  comment: ModuleComment | null;

  @ManyToOne(() => ModuleChildren, module => module.children, {
    nullable: true
  })
  parent: ModuleChildren;

  @OneToMany(() => ModuleChildren, module => module.parent, { nullable: true })
  children: ModuleChildren[];

  @OneToOne(() => ModuleType, { nullable: true })
  @JoinColumn()
  type: ModuleType | null;

  @OneToOne(() => ModuleSignature, { nullable: true })
  @JoinColumn()
  indexSignature: ModuleSignature | null;

  @OneToOne(() => ModuleSignature, { nullable: true })
  @JoinColumn()
  getSignature: ModuleSignature | null;

  @OneToMany(() => ModuleSignature, moduleSig => moduleSig.module, {
    nullable: true
  })
  signatures: ModuleSignature[];

  @OneToMany(() => ModuleParameter, param => param.module, { nullable: true })
  typeParameter: ModuleParameter[];

  @ManyToOne(() => ModuleFile, file => file.children, { nullable: true })
  file: ModuleFile;
}
