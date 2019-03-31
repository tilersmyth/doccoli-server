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
import { CommentNodeEntity } from "./Comment";
import { FileNodeEntity } from "./File";
import { TypeNodeEntity } from "./Type";
import { SignatureNodeEntity } from "./Signature";
import { ParameterNodeEntity } from "./Parameter";

@Entity("children_node")
export class ChildrenNodeEntity extends BaseEntity {
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

  @OneToOne(() => CommentNodeEntity, { nullable: true })
  @JoinColumn()
  comment: CommentNodeEntity | null;

  @ManyToOne(() => ChildrenNodeEntity, node => node.children, {
    nullable: true
  })
  parent: ChildrenNodeEntity;

  @OneToMany(() => ChildrenNodeEntity, node => node.parent, { nullable: true })
  children: ChildrenNodeEntity[];

  @OneToOne(() => TypeNodeEntity, { nullable: true })
  @JoinColumn()
  type: TypeNodeEntity | null;

  @OneToOne(() => SignatureNodeEntity, { nullable: true })
  @JoinColumn()
  indexSignature: SignatureNodeEntity | null;

  @OneToOne(() => SignatureNodeEntity, { nullable: true })
  @JoinColumn()
  getSignature: SignatureNodeEntity | null;

  @OneToMany(() => SignatureNodeEntity, signature => signature.node, {
    nullable: true
  })
  signatures: SignatureNodeEntity[];

  @OneToMany(() => ParameterNodeEntity, param => param.node, { nullable: true })
  typeParameter: ParameterNodeEntity[];

  @ManyToOne(() => FileNodeEntity, file => file.children, {
    nullable: true
  })
  file: FileNodeEntity;
}
