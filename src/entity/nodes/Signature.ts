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
import { TypeNodeEntity } from "./Type";
import { ParameterNodeEntity } from "./Parameter";
import { CommentNodeEntity } from "./Comment";
import { ChildrenNodeEntity } from "./Children";

@Entity("signatures_node")
export class SignatureNodeEntity extends BaseEntity {
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

  @Column()
  startCommit: string;

  @Column({ nullable: true })
  endCommit: string;

  @OneToOne(() => CommentNodeEntity, { nullable: true })
  @JoinColumn()
  comment: CommentNodeEntity | null;

  @OneToOne(() => TypeNodeEntity, { nullable: true })
  @JoinColumn()
  type: TypeNodeEntity | null;

  @OneToMany(() => ParameterNodeEntity, parameters => parameters.signature, {
    nullable: true
  })
  parameters: ParameterNodeEntity[];

  @OneToMany(() => ParameterNodeEntity, param => param.typeSignature, {
    nullable: true
  })
  typeParameter: ParameterNodeEntity[];

  @ManyToOne(() => ChildrenNodeEntity, node => node.signatures, {
    nullable: true
  })
  node: ChildrenNodeEntity;
}
