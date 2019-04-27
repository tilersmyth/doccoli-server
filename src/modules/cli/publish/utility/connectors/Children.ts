import { EntityManager } from "typeorm";

import { ChildrenNodeConnector } from "../../../../../entity";
import { ChildrenNode } from "../nodes/Children";

export class ChildrenConnector extends ChildrenNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.transaction = transaction;
  }

  create(parent: any) {
    const newConnector = new ChildrenNodeConnector();

    const { name } = parent.constructor;

    if (name === "FileEntity") {
      newConnector.file = parent;
    }

    if (name === "ChildrenNodeConnector") {
      newConnector.parent = parent;
    }

    return this.transaction.save(newConnector);
  }
}
