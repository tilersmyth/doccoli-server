import { EntityManager } from "typeorm";

import { TypeArgumentsNodeConnector } from "../../../../../entity";
import { TypeNode } from "../nodes/Type";

interface ConnectorRelation {
  [index: string]: any;
}

export class TypeArgumentsConnector extends TypeNode {
  commit: any;
  transaction: EntityManager;

  constructor(commit: any, transaction: EntityManager) {
    super(commit, transaction);
    this.transaction = transaction;
  }

  private static relations: any = [
    {
      key: "type",
      instance: "TypeNodeConnector",
      array: false
    },
    {
      key: "types",
      instance: "TypesNodeConnector",
      array: true
    }
  ];

  create(parent: any) {
    const connector: ConnectorRelation = new TypeArgumentsNodeConnector();

    const { name } = parent.constructor;

    const relations = TypeArgumentsConnector.relations.find(
      (relation: any) => relation.instance === name
    );

    if (!relations) {
      throw Error(`relation ${name} not joined on TypeArgumentsNodeConnector`);
    }

    if (relations) {
      connector[relations.key] = relations.array ? [parent] : parent;
    }

    return this.transaction.save(connector);
  }
}
