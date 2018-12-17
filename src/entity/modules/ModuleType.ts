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

@Entity("module_types")
export class ModuleType extends BaseEntity {
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

  @ManyToOne(() => ModuleType, type => type.types, { nullable: true })
  parentType: ModuleType | null;

  @OneToMany(() => ModuleType, types => types.parentType, { nullable: true })
  types: ModuleType[];
}
