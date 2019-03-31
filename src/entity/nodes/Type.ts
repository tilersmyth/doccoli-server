import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from "typeorm";

@Entity("types_node")
export class TypeNodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { nullable: true }) // nullable when used in types
  name: string;

  @Column("text")
  type: string;

  @Column("text", { nullable: true })
  refPath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  startCommit: string;

  @Column({ nullable: true })
  endCommit: string;

  @ManyToOne(() => TypeNodeEntity, type => type.types, { nullable: true })
  parentType: TypeNodeEntity | null;

  @OneToMany(() => TypeNodeEntity, types => types.parentType, {
    nullable: true
  })
  types: TypeNodeEntity[];
}
