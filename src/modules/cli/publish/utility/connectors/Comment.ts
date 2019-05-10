import { EntityManager } from "typeorm";

import { CommentNodeConnector } from "../../../../../entity/connectors/Comment";
import { CommentNode } from "../nodes/Comment";

interface ConnectorRelation {
  [index: string]: any;
}

export class CommentConnector extends CommentNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.commit = commit;
    this.transaction = transaction;
  }

  private static relations: any = [
    {
      key: "children",
      instance: "ChildrenNodeConnector",
      array: false
    },
    {
      key: "signatures",
      instance: "SignatureNodeConnector",
      array: false
    }
  ];

  create = (entity: any, _: any) => {
    const connector: ConnectorRelation = new CommentNodeConnector();

    const { name } = entity.constructor;

    const relations = CommentConnector.relations.find(
      (relation: any) => relation.instance === name
    );

    if (!relations) {
      throw Error(`relation ${name} not joined on CommentNodeConnector`);
    }

    if (relations) {
      connector[relations.key] = relations.array ? [entity] : entity;
    }

    return this.transaction.save(connector);
  };
}
