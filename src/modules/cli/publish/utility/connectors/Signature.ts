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

  get entity() {
    return SignatureNodeConnector;
  }

  async create(entity: any, _: any) {
    const connector: ConnectorRelation = new SignatureNodeConnector();

    const { name } = entity.constructor;

    const relations = SignatureConnector.relations.find(
      (relation: any) => relation.instance === name
    );

    if (!relations) {
      throw Error(`relation ${name} not joined on SignatureNodeConnector`);
    }

    if (relations) {
      connector[relations.key] = relations.array ? [entity] : entity;
    }

    return this.transaction.save(connector);
  }
}
