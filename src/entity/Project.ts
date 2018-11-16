import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  Generated
} from "typeorm";

import { Team } from "./Team";
import { Commit } from "./Commit";

@Entity("projects")
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column()
  @Generated("uuid")
  key: string;

  @Column("text")
  slug: string;

  @Column("boolean", { default: false })
  setup: boolean;

  @Column("boolean", { default: false })
  active: boolean;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => Team, team => team.project)
  teams: Team[];

  @OneToMany(() => Commit, commit => commit.project)
  commits: Commit[];
}
