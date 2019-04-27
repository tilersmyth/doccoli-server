import { EntityManager } from "typeorm";

import { ParameterNodeConnector } from "../../../../../entity";
import { ParameterNode } from "../nodes/Parameter";

export class ParameterConnector extends ParameterNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.transaction = transaction;
  }

  async create(parent: any) {
    const newConnector = new ParameterNodeConnector();

    const { name } = parent.constructor;

    if (name === "TypeNodeConnector") {
      newConnector.type = parent;
    }

    if (name === "ChildrenNodeConnector") {
      newConnector.children = parent;
    }

    if (name === "SignatureNodeConnector") {
      newConnector.signatures = parent;
    }

    return this.transaction.save(newConnector);
  }
}
