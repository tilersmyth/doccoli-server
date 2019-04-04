import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { TypeNodeConnectorEntity } from "./TypeConnector";
import { ParameterNodeConnectorEntity } from "./ParameterConnector";
import { CommentNodeConnectorEntity } from "./CommentConnector";
import { ChildrenNodeConnectorEntity } from "./ChildrenConnector";
import { SignatureNodeEntity } from "./Signature";

@Entity("signature_node_connectors")
export class SignatureNodeConnectorEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => CommentNodeConnectorEntity, { nullable: true })
  @JoinColumn()
  comment: CommentNodeConnectorEntity | null;

  @OneToOne(() => TypeNodeConnectorEntity, { nullable: true })
  @JoinColumn()
  type: TypeNodeConnectorEntity | null;

  @OneToMany(
    () => ParameterNodeConnectorEntity,
    parameters => parameters.signature,
    {
      nullable: true
    }
  )
  parameters: ParameterNodeConnectorEntity[];

  @OneToMany(() => ParameterNodeConnectorEntity, param => param.typeSignature, {
    nullable: true
  })
  typeParameter: ParameterNodeConnectorEntity[];

  @ManyToOne(() => ChildrenNodeConnectorEntity, node => node.signatures, {
    nullable: true
  })
  children: ChildrenNodeConnectorEntity;

  @OneToMany(() => SignatureNodeEntity, node => node.connector, {
    nullable: true
  })
  node: SignatureNodeEntity[];
}
