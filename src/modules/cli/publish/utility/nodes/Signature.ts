import { EntityManager } from "typeorm";
import { SignatureNodeEntity } from "../../../../../entity";

export class SignatureNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    this.commit = commit;
    this.transaction = transaction;
  }

  get nodeEntity() {
    return SignatureNodeEntity;
  }

  save(connector: any, fields: any) {
    const signature = new SignatureNodeEntity();
    Object.assign(signature, fields);
    signature.startCommit = this.commit;
    signature.connector = connector;
    return this.transaction.save(signature);
  }
}
