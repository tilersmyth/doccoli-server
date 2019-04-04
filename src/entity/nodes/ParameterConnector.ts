import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { TypeNodeConnectorEntity } from "./TypeConnector";
import { SignatureNodeConnectorEntity } from "./SignatureConnector";
import { ChildrenNodeConnectorEntity } from "./ChildrenConnector";
import { ParameterNodeEntity } from "./Parameter";

@Entity("parameter_node_connectors")
export class ParameterNodeConnectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => TypeNodeConnectorEntity, { nullable: true })
  @JoinColumn()
  type: TypeNodeConnectorEntity | null;

  @ManyToOne(() => SignatureNodeConnectorEntity, sig => sig.parameters, {
    nullable: true
  })
  signature: SignatureNodeConnectorEntity;

  @ManyToOne(() => SignatureNodeConnectorEntity, sig => sig.typeParameter, {
    nullable: true
  })
  typeSignature: SignatureNodeConnectorEntity;

  @ManyToOne(() => ChildrenNodeConnectorEntity, node => node.typeParameter, {
    nullable: true
  })
  children: ChildrenNodeConnectorEntity;

  @OneToMany(() => ParameterNodeEntity, node => node.connector, {
    nullable: true
  })
  node: ParameterNodeEntity[];
}
