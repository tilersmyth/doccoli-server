import { EntityManager } from "typeorm";
import {
  SignatureNodeEntity,
  SignaturePositionEntity
} from "../../../../../entity";

export class SignatureNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  private position = async (connector: any, position: number) => {
    const nodePosition = new SignaturePositionEntity();
    nodePosition.connectorId = connector.id;
    nodePosition.position = position;
    nodePosition.startCommit = this.commit;
    return this.transaction.save(nodePosition);
  };

  get nodeEntity() {
    return SignatureNodeEntity;
  }

  save = async (connector: any, fields: any) => {
    const signature = new SignatureNodeEntity();
    Object.assign(signature, fields);
    signature.startCommit = this.commit;
    signature.connector = connector;

    if (typeof fields.position !== "undefined") {
      const position = await this.position(connector, fields.position);
      signature.position = [position];
    }

    return this.transaction.save(signature);
  };
}
