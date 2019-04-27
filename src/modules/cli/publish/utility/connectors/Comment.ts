import { EntityManager } from "typeorm";

import { CommentNodeConnector } from "../../../../../entity/connectors/Comment";
import { CommentNode } from "../nodes/Comment";

export class CommentConnector extends CommentNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.commit = commit;
    this.transaction = transaction;
  }

  create = (parent: any) => {
    const newConnector = new CommentNodeConnector();

    const { name } = parent.constructor;

    if (name === "ChildrenNodeConnector") {
      newConnector.children = parent;
    }

    if (name === "SignatureNodeConnector") {
      newConnector.signatures = parent;
    }

    return this.transaction.save(newConnector);
  };
}
