import { EntityManager } from "typeorm";

import { SignatureNodeConnector } from "../../../../../entity";
import { SignatureNode } from "../nodes/Signature";

export class SignatureConnector extends SignatureNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.transaction = transaction;
  }

  async create(parent: any) {
    const newConnector = new SignatureNodeConnector();

    newConnector.children = parent;

    return this.transaction.save(newConnector);
  }
}
