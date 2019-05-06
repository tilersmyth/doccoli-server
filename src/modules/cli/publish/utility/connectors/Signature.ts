import { EntityManager } from "typeorm";

import { SignatureNodeConnector } from "../../../../../entity";
import { SignatureNode } from "../nodes/Signature";

interface ConnectorRelation {
  [index: string]: any;
}

export class SignatureConnector extends SignatureNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.transaction = transaction;
  }

  private static relations: any = [
    {
      key: "children",
      instance: "ChildrenNodeConnector",
      array: false
    },
    {
      key: "comment",
      instance: "CommentNodeConnector",
      array: false
    }
  ];

  async create(parent: any) {
    const connector: ConnectorRelation = new SignatureNodeConnector();

    const { name } = parent.constructor;

    const relations = SignatureConnector.relations.find(
      (relation: any) => relation.instance === name
    );

    if (!relations) {
      throw Error(`relation ${name} not joined on SignatureNodeConnector`);
    }

    if (relations) {
      console.log(relations.key);
      connector[relations.key] = relations.array ? [parent] : parent;
    }

    return this.transaction.save(connector);
  }
}
